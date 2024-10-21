import { CommonItemType } from "../../Item";

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

  return clamps;
}
