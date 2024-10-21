import { CommonItemType } from "../../Item";
import { NeonType } from "../../Neon/model";

export function getEsPlugs(allItems: CommonItemType[]) {
  let plugs = 0;
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      plugs += neon.contours;
    }
  });

  return plugs;
}
