import { BeltLightLampStepEnum, BeltLightType } from "../../BeltLight";
import { CommonItemType } from "../../Item";

export function getEsLamps(allItems: CommonItemType[]) {
  let lamps = 0;
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Белт-лайт") {
      const beltLight = itemObj.item as BeltLightType;
      if (beltLight.lampStep === BeltLightLampStepEnum.cm_20) {
        lamps += beltLight.length * 5;
      } else if (beltLight.lampStep === BeltLightLampStepEnum.cm_40) {
        lamps += beltLight.length * 2.5;
      }
    }
  });

  return Math.ceil(lamps);
}
