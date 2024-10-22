import { CommonItemType } from "../../Item";
import { VagiModelEnum, VagiType } from "../model";

export function getAllVagi(allItems: CommonItemType[]) {
  let vagi = 0;

  allItems.forEach((itemObj) => {
    if (Object.hasOwn(itemObj.item, "contours")) {
      const itemWithContours = itemObj.item as {
        contours: number;
      };
      vagi += itemWithContours.contours * 2;
    }
  });

  return vagi;
}

export function getVagiModel(allItems: CommonItemType[]) {
  const result = allItems.find(
    (itemObj) => itemObj.itemTitle === "Ваги (клемма)"
  );
  if (result) {
    const vagi = result.item as VagiType;
    return vagi.model;
  } else return VagiModelEnum.wire_2;
}
