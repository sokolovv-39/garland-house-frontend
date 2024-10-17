import { CommonItemType } from "../../Item";
import { GetItemLengthType } from "../../Item/model";
import { PVSType } from "../../PVS";

export function getBoxPVSPieces(allItems: CommonItemType[]): GetItemLengthType {
  let pvsLength = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Кабель ПВС") {
      const pvs = itemObj.item as PVSType;
      pvsLength += pvs.length;
    }
  });

  const piece = 2;
  const piecesQuantity = Math.ceil(pvsLength / piece);
  const piecesMeters = piece * piecesQuantity;
  return { skeinsQuantity: piecesQuantity, skeinsMeters: piecesMeters };
}
