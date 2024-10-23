import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { getPVSLength } from "./estimateAlgs";
import { pvsDefault } from "../model";
import { getCorrPVSLength } from "../../CorrugationPVS";
import { getBoxPvsLength } from "../../BoxPVS";

export function pvsRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  let pvsLength = getPVSLength(allItems);
  let price = pvsDefault.extraPrice;

  if (pvsLength > 20) {
    const meters = pvsLength - 20;
    return [
      {
        id: startId.toString(),
        desc: `Монтаж кабеля ПВС 2х1,5 свыше 20 п.м.`,
        quantity: meters.toString(),
        unit: "м.п.",
        price: price.toString(),
        cost: (price * meters).toString(),
      },
    ];
  } else return [];
}

export function extraCorrBoxRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  const length =
    getCorrPVSLength(allItems).skeinsMeters +
    getBoxPvsLength(allItems).piecesMeters;
  const price = pvsDefault.extraPrice;

  if (length > 20) {
    const meters = length - 20;
    return [
      {
        id: startId.toString(),
        desc: `Монтаж гофры или кабель-канала свыше 20 п.м.`,
        unit: "м.п.",
        quantity: meters.toString(),
        price: price.toString(),
        cost: (price * meters).toString(),
      },
    ];
  } else return [];
}
