import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { defaultNeon, NeonThicknessEnum, NeonType } from "../model";
import { getNeonLength } from "./estimateAlgs";

export function neonRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  const mergedItems: (Pick<NeonType, "glowShade" | "thickness" | "length"> & {
    price: number;
  })[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      const index = mergedItems.findIndex((el) => {
        if (el.glowShade === neon.glowShade && el.thickness === neon.thickness)
          return true;
        else return false;
      });
      if (index !== -1) {
        mergedItems[index].length += neon.length;
      } else {
        let price =
          neon.thickness === NeonThicknessEnum.Small
            ? defaultNeon.priceObj.m_8_16
            : defaultNeon.priceObj.m_14_25;
        mergedItems.push({
          length: neon.length,
          glowShade: neon.glowShade,
          thickness: neon.thickness,
          price: price,
        });
      }
    }
  });

  const rfp: LineType[] = [];

  mergedItems.forEach((el, index) => {
    const neonMeters = el.length;
    let desc = `Монтаж неона гибкого светодиодного. Размер ${el.thickness}. Класс защиты IP76. Cвечение на выбор + Монтаж профиля алюминиевого для неона гибкого ${el.thickness}`;
    rfp.push({
      id: `${startId + index}`,
      desc,
      unit: "м.п",
      quantity: neonMeters.toString(),
      price: el.price.toString(),
      cost: `${neonMeters * el.price}`,
    });
  });

  return rfp;
}

export function neonPaintingRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  let mergedItems: (Pick<NeonType, "thickness" | "length"> & {
    price: number;
  })[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      if (neon.painting) {
        const index = mergedItems.findIndex(
          (el) => el.thickness === neon.thickness
        );
        if (index !== -1) {
          mergedItems[index].length += neon.ral_meters;
        } else {
          let price =
            neon.thickness === NeonThicknessEnum.Small
              ? defaultNeon.priceObj.m_8_16_prof
              : defaultNeon.priceObj.m_14_25_prof;
          mergedItems.push({
            length: neon.ral_meters,
            thickness: neon.thickness,
            price: price,
          });
        }
      }
    }
  });

  const rfp: LineType[] = [];

  mergedItems.map((el) => {
    return {
      ...el,
      price: el.price < 15000 ? 15000 : el.price,
    };
  });

  mergedItems.forEach((el, index) => {
    rfp.push({
      id: `${startId + index}`,
      desc: `Покраска профиля алюминиевого для неона гибкого ${el.thickness}`,
      unit: "м.п.",
      quantity: el.length.toString(),
      price: el.price.toString(),
      cost: `${el.price * el.length}`,
    });
  });

  return rfp;
}
