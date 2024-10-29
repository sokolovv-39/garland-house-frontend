import { getCorrPVSLength } from "../../CorrugationPVS";
import { CommonItemType } from "../../Item";
import { getPVSLength } from "../../PVS";

export function getEsCorrClips(allItems: CommonItemType[]) {
  let clips = 0;
  const pack = 50;
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гофра для кабеля ПВС") {
      const corrLength = getCorrPVSLength(allItems).skeinsMeters;
      clips += corrLength * 5;
    }
  });

  const packsQuantity = Math.ceil(clips / pack);
  return packsQuantity;
}
