import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { FringeBracingEnum, FringeType } from "../../Fringe";
import { CommonItemType } from "../../Item";
import { ThreadBracingEnum, ThreadType } from "../../Thread";
import { PVSColorEnum } from "../../PVS";

export function getEsCableBrackets(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const brackets: {
    quantity: number;
    color: "Черный" | "Белый";
  }[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const fringe = itemObj.item as FringeType;
      const index = brackets.findIndex((el) => {
        if (el.color === fringe.cable) return true;
        else return false;
      });
      if (~index) {
        brackets[index].quantity += fringe.length * 5;
      } else {
        brackets.push({
          color: fringe.cable,
          quantity: fringe.length * 5,
        });
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      const index = brackets.findIndex((el) => el.color === thread.cable);
      if (~index) {
        brackets[index].quantity += thread.length * 5;
      } else {
        brackets.push({
          color: thread.cable,
          quantity: thread.length * 5,
        });
      }
    }
  });

  const esBrackets: EsWritingArrayType[] = [];

  brackets.forEach((el) => {
    const pack = 50;
    const packsQuantity = Math.ceil(el.quantity / pack);
    esBrackets.push({
      desc: `Скоба кабельная / ${el.color}`,
      keyValue: `${packsQuantity} уп`,
    });
  });
  return esBrackets;
}
