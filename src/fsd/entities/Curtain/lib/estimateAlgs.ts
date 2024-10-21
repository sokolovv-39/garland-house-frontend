import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { CurtainType } from "../model";

export function getCurtainScreedsPacks(length: number) {
  let pack = 100;
  const screeds = length * 5;
  const packsQuantity = Math.ceil(screeds / pack);
  return packsQuantity;
}

export function getEsCurtains(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const curtains: CurtainType[] = [];
  const esCurtains: EsWritingArrayType[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Занавес") {
      const curtain = itemObj.item as CurtainType;
      let existIndex = curtains.findIndex((item) => {
        if (
          item.size === curtain.size &&
          item.glowShade === curtain.glowShade &&
          item.glowMode === curtain.glowMode &&
          item.cable === curtain.cable
        )
          return true;
        else return false;
      });
      if (existIndex !== -1) {
        curtains[existIndex].quantity += curtain.quantity;
      } else {
        curtains.push(curtain);
      }
    }
  });

  curtains.forEach((item) => {
    esCurtains.push({
      desc: `${item.title} / ${item.size} / ${item.glowShade} / ${item.glowMode} / ${item.cable} / Крепление: ${item.bracing}`,
      keyValue: `${item.quantity} шт`,
    });
  });

  return esCurtains;
}
