import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { GetItemLengthType } from "../../Item/model";
import { getPVSLength, PVSType } from "../../PVS";
import { CorrugationType } from "../model";

export function getCorrPVSLength(
  allItems: CommonItemType[]
): GetItemLengthType {
  let length = 0;
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гофра для кабеля ПВС") {
      const corr = itemObj.item as CorrugationType;
      length += corr.length;
    }
  });

  const skein = 50;
  const skeinsQuantity = Math.ceil(length / skein);
  const skeinsMeters = skein * skeinsQuantity;
  const pure = length;
  return { skeinsQuantity, skeinsMeters, pure };
}

export function getCorrPVSClips(allItems: CommonItemType[]) {
  const pack = 50;
  const pvsLength = getCorrPVSLength(allItems);
  const clips = pvsLength.skeinsMeters * 5;
  const packsQuantity = Math.ceil(clips / pack);
  return packsQuantity;
}

export function getEsCorrPVS(allItems: CommonItemType[]): EsWritingArrayType[] {
  const corrs: Pick<CorrugationType, "thickness" | "color" | "length">[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гофра для кабеля ПВС") {
      const corr = itemObj.item as CorrugationType;
      const index = corrs.findIndex((el) => {
        if (el.color === corr.color && el.thickness === corr.thickness)
          return true;
        else return false;
      });
      if (~index) {
        corrs[index].length += corr.length;
      } else {
        corrs.push({
          length: corr.length,
          thickness: corr.thickness,
          color: corr.color,
        });
      }
    }
  });

  const esCorrs: EsWritingArrayType[] = [];

  corrs.forEach((el) => {
    esCorrs.push({
      desc: `Гофра / ${el.color} / ${el.thickness} / бухта-50м`,
      keyValue: `${getCorrPVSLength(allItems).skeinsQuantity} шт`,
    });
  });

  return esCorrs;
}
