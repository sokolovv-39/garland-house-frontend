import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { GetItemLengthType } from "../../Item/model";
import { getPVSLength, PVSType } from "../../PVS";
import { CorrugationType } from "../model";

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
  const clips = pvsLength.skeinsMeters * 5;
  const packsQuantity = Math.ceil(clips / pack);
  return packsQuantity;
}

export function getEsCorrPVS(allItems: CommonItemType[]): EsWritingArrayType {
  const corr = allItems.find(
    (itemObj) => itemObj.itemTitle === "Гофра для кабеля ПВС"
  );
  if (corr) {
    const typedCorr = corr.item as CorrugationType;
    const pvsLength = getPVSLength(allItems);
    const skein = 50;
    const skeinQuantity = Math.ceil(pvsLength / skein);
    const skeinMeters = skein * skeinQuantity;
    return {
      desc: `${typedCorr.title} / ${typedCorr.thickness} / ${typedCorr.color}`,
      keyValue: `${skeinMeters} м`,
    };
  } else
    return {
      desc: ``,
      keyValue: `0`,
    };
}
