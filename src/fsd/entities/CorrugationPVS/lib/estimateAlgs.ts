import { CommonItemType } from "../../Item";
import { GetItemLengthType } from "../../Item/model";
import { PVSType } from "../../PVS";

export function getCorrPVSLength(items: CommonItemType[]): GetItemLengthType {
  let pvsLength = 0;

  items.forEach((itemObj) => {
    if (itemObj.itemTitle === "Кабель ПВС") {
      const pvs = itemObj.item as PVSType;
      pvsLength += pvs.length;
    }
  });

  const skein = 50;
  const skeinsQuantity = Math.ceil(pvsLength / skein);
  const skeinsMeters = skein * skeinsQuantity;
  return { skeinsQuantity, skeinsMeters };
}

export function getCorrPVSClips(allItems: CommonItemType[]) {
  const pack = 50;
  const pvsLength = getCorrPVSLength(allItems);
  const clips = pvsLength.skeinsQuantity * 5;
  const packsQuantity = Math.ceil(clips / pack);
  return packsQuantity;
}
