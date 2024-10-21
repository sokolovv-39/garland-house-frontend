import { CommonItemType } from "../../Item";
import { NeonType } from "../../Neon/model";

export function getEsMetalProfile(allItems: CommonItemType[]) {
  let profLength = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      profLength += Math.ceil(1.1 * neon.length);
    }
  });

  const pack = 2;
  const packsQuantity = Math.ceil(profLength / pack);
  const profMeters = pack * packsQuantity;

  return profMeters;
}
