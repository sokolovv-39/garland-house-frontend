import { CommonItemType } from "../../Item";

export function getEsLanyards(allItems: CommonItemType[]) {
  let lanyards = 0;
  allItems.forEach((itemObj) => {
    const item = itemObj.item;
    if ("contours" in item && "bracing" in item) {
      if (item.bracing === "Трос") {
        lanyards += item.contours;
      }
    }
  });

  return lanyards;
}
