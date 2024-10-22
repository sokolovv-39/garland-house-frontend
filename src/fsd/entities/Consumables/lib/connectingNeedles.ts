import { CommonItemType } from "../../Item";
import { NeonType } from "../../Neon/model";

export function getEsConnectingNeedles(allItems: CommonItemType[]) {
  let needles = 0;
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      needles = neon.needles;
    }
  });

  return needles;
}
