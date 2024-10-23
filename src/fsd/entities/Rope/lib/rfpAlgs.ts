import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { getEsRope, getRopeLength } from "./estimateAlgs";
import { defaultFringe, FringeBracingEnum, FringeType } from "../../Fringe";
import { ropeDefault, RopeType } from "../model";

export function ropeRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  let length = 0;
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Трос") {
      const rope = itemObj.item as RopeType;
      length += rope.length;
    }
  });

  if (length) {
    return [
      {
        id: startId.toString(),
        desc: "Монтаж троса",
        quantity: length.toString(),
        unit: "м.п",
        price: ropeDefault.price.toString(),
        cost: `${length * ropeDefault.price}`,
      },
    ];
  } else return [];
}