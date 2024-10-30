import { CommonItemType } from "../../Item";
import { RopeType } from "../../Rope";

export function getEsDuplexClamps(allItems: CommonItemType[]) {
  let clamps = 0;
  allItems.forEach((itemObj) => {
    const item = itemObj.item;
    if ("contours" in item && "bracing" in item) {
      if (item.bracing === "Трос") {
        clamps += item.contours * 2;
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Трос") {
      const rope = itemObj.item as RopeType;
      clamps += rope.duplexClamps;
    }
  });

  return clamps;
}
