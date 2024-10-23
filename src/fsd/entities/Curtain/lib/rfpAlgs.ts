import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { CurtainSizeEnum, CurtainType } from "../model";

export function curtainRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  const mergedItems: Pick<
    CurtainType,
    "cable" | "glowMode" | "glowShade" | "size" | "priceObj" | "quantity"
  >[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Занавес") {
      const curtain = itemObj.item as CurtainType;
      const index = mergedItems.findIndex((el) => {
        if (
          el.cable === curtain.cable &&
          el.glowMode === curtain.glowMode &&
          el.glowShade === curtain.glowShade &&
          el.size === curtain.size
        )
          return true;
        else return false;
      });

      if (index !== -1) {
        mergedItems[index].quantity += curtain.quantity;
      } else {
        mergedItems.push({
          cable: curtain.cable,
          glowMode: curtain.glowMode,
          glowShade: curtain.glowShade,
          size: curtain.size,
          priceObj: curtain.priceObj,
          quantity: curtain.quantity,
        });
      }
    }
  });

  const rfp: LineType[] = [];
  mergedItems.forEach((el, index) => {
    let desc = `Монтаж занавеса ${el.size}, 220 В. Класс защиты IP65. Цвет провода и свечение на выбор. Блок питания входит в комплект`;
    let price = 0;
    if (el.size === CurtainSizeEnum.s_2_1) price = el.priceObj.s_2_1;
    if (el.size === CurtainSizeEnum.s_2_1d5) price = el.priceObj.s_2_1dot5;
    if (el.size === CurtainSizeEnum.s_2_2) price = el.priceObj.s_2_2;
    if (el.size === CurtainSizeEnum.s_2_3) price = el.priceObj.s_2_3;
    if (el.size === CurtainSizeEnum.s_2_4) price = el.priceObj.s_2_4;
    if (el.size === CurtainSizeEnum.s_2_6) price = el.priceObj.s_2_6;
    if (el.size === CurtainSizeEnum.s_2_9) price = el.priceObj.s_2_6;

    rfp.push({
      id: `${startId + index}`,
      desc,
      unit: "шт",
      quantity: el.quantity.toString(),
      price: price.toString(),
      cost: `${el.quantity * price}`,
    });
  });

  return rfp;
}
