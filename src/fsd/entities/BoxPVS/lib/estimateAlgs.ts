import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { GetItemLengthType } from "../../Item/model";
import { getPVSLength, PVSType } from "../../PVS";
import { BoxPVSType } from "../model";

export function getEsBoxPvs(allItems: CommonItemType[]): EsWritingArrayType {
  const box = allItems.find(
    (itemObj) => itemObj.itemTitle === "Кабель-канал (короб) для кабеля ПВС"
  );
  if (box) {
    const typedBox = box.item as BoxPVSType;
    const pvsLength = getPVSLength(allItems);
    const piece = 2;
    const piecesQuantity = Math.ceil(pvsLength / piece);
    const piecesMeters = piece * piecesQuantity;
    return {
      desc: `${typedBox.title} / 25x16мм / ${typedBox.color} / Кратность 2 м`,
      keyValue: `${piecesQuantity} шт`,
    };
  } else
    return {
      desc: ``,
      keyValue: `0`,
    };
}
