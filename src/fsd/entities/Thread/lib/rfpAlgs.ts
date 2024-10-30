import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import {
  defaultThread,
  ThreadBracingEnum,
  ThreadGlowModeEnum,
  ThreadGlowShadeEnum,
  ThreadType,
} from "../model";
import { getThreadLength } from "./estimateAlgs";
import { PVSColorEnum } from "../../PVS";

export function threadRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  const mergedItems: Pick<
    ThreadType,
    "cable" | "glowShade" | "glowMode" | "length"
  >[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      const index = mergedItems.findIndex((el) => {
        if (
          el.cable === thread.cable &&
          el.glowMode === thread.glowMode &&
          el.glowShade === thread.glowShade
        )
          return true;
        else return false;
      });
      if (index !== -1) {
        mergedItems[index].length += thread.length;
      } else {
        mergedItems.push({
          cable: thread.cable,
          glowMode: thread.glowMode,
          glowShade: thread.glowShade,
          length: thread.length,
        });
      }
    }
  });

  const rfp: LineType[] = [];

  mergedItems.forEach((el, index) => {
    const threadMeters = el.length;
    let desc = `Монтаж нити светодиодной. Класс защиты IP65. Материал провода каучук.`;
    if (el.cable === PVSColorEnum.Black) desc += " Черный провод.";
    if (el.cable === PVSColorEnum.White) desc += " Белый провод.";
    if (el.glowShade === ThreadGlowShadeEnum.RGB) desc += " RGB.";
    if (el.glowShade === ThreadGlowShadeEnum.Warm) desc += " Теплый свет";
    if (el.glowShade === ThreadGlowShadeEnum.Cold) desc += " Холодный свет";
    if (el.glowShade === ThreadGlowShadeEnum.colors_7)
      desc += " 7 цветов разные режимы мерцания.";
    if (
      el.glowMode === ThreadGlowModeEnum.Flickering &&
      el.glowShade !== ThreadGlowShadeEnum.RGB &&
      el.glowShade !== ThreadGlowShadeEnum.colors_7
    )
      desc += " с холодным мерцанием.";
    if (
      el.glowMode === ThreadGlowModeEnum.Static_glow &&
      el.glowShade !== ThreadGlowShadeEnum.RGB &&
      el.glowShade !== ThreadGlowShadeEnum.colors_7
    )
      desc += " статика.";
    desc += " Кратно 10м";

    let price = 0;
    if (
      el.glowShade === ThreadGlowShadeEnum.Cold ||
      el.glowShade === ThreadGlowShadeEnum.Warm
    ) {
      price = defaultThread.priceObj.one_color;
    }
    if (el.glowShade === ThreadGlowShadeEnum.RGB)
      price = defaultThread.priceObj.rgb;
    if (el.glowShade === ThreadGlowShadeEnum.colors_7)
      price = defaultThread.priceObj.multi;

    rfp.push({
      id: `${startId + index}`,
      desc,
      unit: "м.п",
      quantity: threadMeters.toString(),
      price: price.toString(),
      cost: (threadMeters * price).toString(),
    });
  });

  return rfp;
}

export function threadBracingRFP(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  let length = 0;
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      if (thread.bracing === ThreadBracingEnum.Brackets) {
        length += thread.length;
      }
    }
  });

  if (length) {
    return [
      {
        id: startId.toString(),
        desc: "Монтаж Нити светодиодной с применением скобы в фасад дома",
        unit: "м.п",
        quantity: length.toString(),
        price: defaultThread.priceObj.price_screed_bracing.toString(),
        cost: `${defaultThread.priceObj.price_screed_bracing * length}`,
      },
    ];
  } else return [];
}

export function threadOnTreeRFP(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  let length = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      if (thread.tree.isActive && thread.tree.height > 5) {
        length += thread.length;
      }
    }
  });

  if (length) {
    return [
      {
        id: startId.toString(),
        desc: `Монтаж Нити светодиодной на дерево высотой более 5 метров`,
        unit: "м.п",
        quantity: length.toString(),
        price: defaultThread.tree.price.toString(),
        cost: `${Math.ceil(length * defaultThread.tree.price)}`,
      },
    ];
  } else return [];
}
