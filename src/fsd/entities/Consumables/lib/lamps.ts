import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import {
  BeltLightLampStepEnum,
  BeltLightType,
  getBeltLightLength,
} from "../../BeltLight";
import { CommonItemType } from "../../Item";

export function getEsLamps(allItems: CommonItemType[]): EsWritingArrayType[] {
  let lamps: (Pick<BeltLightType, "glowShade"> & {
    quantity: number;
  })[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Белт-лайт") {
      const beltLight = itemObj.item as BeltLightType;
      let newQuantity = 0;
      if (beltLight.lampStep === BeltLightLampStepEnum.cm_20) {
        newQuantity = getBeltLightLength(beltLight.length).skeinMeters * 5;
      }
      if (beltLight.lampStep === BeltLightLampStepEnum.cm_40) {
        newQuantity = getBeltLightLength(beltLight.length).skeinMeters * 2.5;
      }
      const index = lamps.findIndex(
        (el) => el.glowShade === beltLight.glowShade
      );
      if (~index) {
        lamps[index].quantity += newQuantity;
      } else {
        lamps.push({
          quantity: newQuantity,
          glowShade: beltLight.glowShade,
        });
      }
    }
  });

  const esLamps: EsWritingArrayType[] = [];

  lamps.forEach((el) => {
    esLamps.push({
      desc: `Лампа / для неона / ${el.glowShade}`,
      keyValue: `${Math.ceil(el.quantity)} шт`,
    });
  });

  return esLamps;
}
