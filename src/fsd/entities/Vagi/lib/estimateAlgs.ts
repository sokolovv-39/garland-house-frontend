import { CommonItemType } from "../../Item";
import { VagiModelEnum, VagiType } from "../model";

export function getAllVagi(allItems: CommonItemType[]) {
  let vagi = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Ваги (клемма)") {
      const item = itemObj.item as VagiType;
      vagi += item.quantity;
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
