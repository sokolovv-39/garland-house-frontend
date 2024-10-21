import { FringeType } from "../../Fringe";
import { CommonItemType } from "../../Item";
import { getEsRope, RopeSurfaceEnum, RopeType } from "../../Rope";
import { ThreadType } from "../../Thread";

export function getEsAnchorRings(allItems: CommonItemType[]) {
  let rings = 0;

  allItems.forEach((itemObj) => {
    const item = itemObj.item;
    if ("bracing" in item && "surface" in item) {
      if (item.bracing === "Трос" && item.surface === "Бетон") {
        if (itemObj.itemTitle === "Бахрома") {
          const fringe = itemObj.item as FringeType;
          rings += fringe.length;
        }
        if (itemObj.itemTitle === "Нить") {
          const thread = itemObj.item as ThreadType;
          rings += thread.length;
        }
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Трос") {
      const rope = itemObj.item as RopeType;
      if (rope.surface === RopeSurfaceEnum.Concrete) {
        rings += rope.length + rope.contours;
      }
    }
  });

  allItems.forEach((itemObj) => {
    const item = itemObj.item;
    if ("contours" in item && "bracing" in item && "surface" in item) {
      if (item.bracing === "Трос" && item.surface === "Бетон") {
        rings += item.contours;
      }
    }
  });

  return rings;
}
