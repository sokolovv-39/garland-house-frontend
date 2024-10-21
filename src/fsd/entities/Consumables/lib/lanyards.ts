import { CommonItemType } from "../../Item";
import { RopeType } from "../../Rope";

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

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Трос") {
      const rope = itemObj.item as RopeType;
      lanyards += rope.contours;
    }
  });

  return lanyards;
}
