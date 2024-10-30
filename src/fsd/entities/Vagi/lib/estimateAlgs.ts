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
  } else return VagiModelEnum.wire_3;
}

export function getFirstVagi(allItems: CommonItemType[]) {
  let quantity = 0;
  const vagi = allItems.find((el) => el.itemTitle === "Ваги (клемма)");
  if (vagi) {
    const vagiObj = vagi.item as VagiType;
    quantity += vagiObj.quantity;
  }

  return quantity;
}
