import { CommonItemType } from "../../Item";
import { PVSType } from "../../PVS";

export function getCorrPVSLength(items: CommonItemType[]) {
  let pvsLength = 0;

  items.forEach((itemObj) => {
    if (itemObj.itemTitle === "Кабель ПВС") {
      const pvs = itemObj.item as PVSType;
      pvsLength += pvs.length;
    }
  });

  const skein = 50;
  const skeinsQuantity = Math.ceil(pvsLength / skein);
  return skeinsQuantity;
}

export function getCorrPVSClips(allItems: CommonItemType[]) {
  const pack = 50;
  const pvsLength = getCorrPVSLength(allItems);
  const clips = pvsLength * 5;
  const packsQuantity = Math.ceil(clips / pack);
  return packsQuantity;
}
