import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { GetItemLengthType } from "../../Item/model";
import { getPVSLength, PVSType } from "../../PVS";
import { BoxPVSType } from "../model";

export function getBoxPvsLength(allItems: CommonItemType[]): {
  piecesQuantity: number;
  piecesMeters: number;
} {
  const box = allItems.find(
    (itemObj) => (itemObj.itemTitle = "Кабель-канал (короб) для кабеля ПВС")
  );
  if (box) {
    const typedBox = box.item as BoxPVSType;
    const boxLength = typedBox.length;
    const piece = 2;
    const piecesQuantity = Math.ceil(boxLength / piece);
    const piecesMeters = piece * piecesQuantity;
    return { piecesQuantity, piecesMeters };
  } else return { piecesMeters: 0, piecesQuantity: 0 };
}

export function getEsBoxPvs(allItems: CommonItemType[]): EsWritingArrayType {
  const box = allItems.find(
    (itemObj) => itemObj.itemTitle === "Кабель-канал (короб) для кабеля ПВС"
  );
  if (box) {
    const typedBox = box.item as BoxPVSType;
    const meters = getBoxPvsLength(allItems).piecesMeters;
    return {
      desc: `${typedBox.title} / 25x16мм / ${typedBox.color} / Кратность 2 м`,
      keyValue: `${meters} м`,
    };
  } else
    return {
      desc: ``,
      keyValue: `0`,
    };
}
