import { CommonItemType } from "../../Item";
import { getPVSLength } from "../../PVS";

export function getEsCorrClips(allItems: CommonItemType[]) {
  const corrLength = getPVSLength(allItems);
  const clips = corrLength * 5;
  const pack = 50;
  const packsQuantity = Math.ceil(clips / pack);
  return packsQuantity;
}
