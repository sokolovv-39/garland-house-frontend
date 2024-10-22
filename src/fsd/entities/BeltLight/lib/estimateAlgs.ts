import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { BeltLightLampStepEnum, BeltLightType } from "../model";

export function getBeltLightLength(length: number) {
  const skein = 10;
  const skeinsQuantity = Math.ceil(length / skein);
  const skeinMeters = skein * skeinsQuantity;
  return { skeinsQuantity, skeinMeters };
}

export function getEsBeltLight(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const beltLights: BeltLightType[] = [];
  const esBeltLights: EsWritingArrayType[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Белт-лайт") {
      const beltLight = itemObj.item as BeltLightType;
      let existIndex = beltLights.findIndex((item) => {
        if (
          item.glowShade === beltLight.glowShade &&
          item.lampStep === beltLight.lampStep &&
          item.cable === beltLight.cable
        )
          return true;
        else return false;
      });
      if (existIndex !== -1) {
        beltLights[existIndex].length += beltLights.length;
      } else {
        beltLights.push(beltLight);
      }
    }
  });

  beltLights.forEach((item) => {
    esBeltLights.push({
      desc: `${item.title} / ${item.glowShade} / Шаг между цоколями ламп: ${item.lampStep} / ${item.cable}`,
      keyValue: `${getBeltLightLength(item.length).skeinMeters} м`,
    });
  });

  return esBeltLights;
}
