import { CommonItemType } from "../../Item";

export function getEsPowerUnits(allItems: CommonItemType[]) {
  let powerUnits = 0;

  allItems.forEach((itemObj) => {
    const item = itemObj.item;
    if ("powerUnits" in item) {
      powerUnits += item.powerUnits;
    }
  });

  return powerUnits;
}
