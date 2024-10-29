import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { BoxPVSType } from "../model";
import { GetItemLengthType } from "../../Item/model";

export function getBoxPvsLength(allItems: CommonItemType[]): GetItemLengthType {
  const box = allItems.find(
    (itemObj) => itemObj.itemTitle === "Кабель-канал (короб) для кабеля ПВС"
  );
  if (box) {
    const typedBox = box.item as BoxPVSType;
    const boxLength = typedBox.length;
    const piece = 2;
    const skeinsQuantity = Math.ceil(boxLength / piece);
    const skeinsMeters = piece * skeinsQuantity;
    return { skeinsQuantity, skeinsMeters, pure: boxLength };
  } else return { skeinsQuantity: 0, skeinsMeters: 0, pure: 0 };
}

export function getEsBoxPvs(allItems: CommonItemType[]): EsWritingArrayType {
  const box = allItems.find(
    (itemObj) => itemObj.itemTitle === "Кабель-канал (короб) для кабеля ПВС"
  );
  if (box) {
    const typedBox = box.item as BoxPVSType;
    const meters = getBoxPvsLength(allItems).skeinsMeters;
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
