import { CommonItemType } from "../../Item";
import { PVSType } from "../../PVS";

export function getBoxPVSPieces(allItems: CommonItemType[]) {
  let pvsLength = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Кабель ПВС") {
      const pvs = itemObj.item as PVSType;
      pvsLength += pvs.length;
    }
  });

  const piece = 2;
  const piecesQuantity = Math.ceil(pvsLength / piece);
  return piecesQuantity;
}
