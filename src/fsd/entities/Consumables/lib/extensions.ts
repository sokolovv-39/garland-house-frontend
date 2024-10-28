import {
  EsWritingArrayType,
  LineType,
} from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { FringeCableEnum, FringeType } from "../../Fringe";
import { BeltLightType } from "../../BeltLight";
import { NeonType } from "../../Neon/model";
import { ThreadType } from "../../Thread";
import { CurtainType } from "../../Curtain";

export const extPrice = 200;
export const teePrice = 500;

export function getEsExtensions(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const esExt: EsWritingArrayType[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const item = itemObj.item as FringeType;
      esExt.push({
        desc: `Удлинитель / бахрома / 1м / ${item.cable}`,
        keyValue: `${item.extensions_1m} шт`,
      });
      esExt.push({
        desc: `Удлинитель / бахрома / 3м / ${item.cable}`,
        keyValue: `${item.extensions_3m} шт`,
      });
      esExt.push({
        desc: `Удлинитель / бахрома / 5м / ${item.cable}`,
        keyValue: `${item.extensions_5m} шт`,
      });
      esExt.push({
        desc: `Удлинитель / бахрома / 10м / ${item.cable}`,
        keyValue: `${item.extensions_10m} шт`,
      });
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const item = itemObj.item as NeonType;
      esExt.push({
        desc: `Соединитель / гибкий неон / ${item.glowShade}`,
        keyValue: `${item.extensions_1m} шт`,
      });
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const item = itemObj.item as ThreadType;
      esExt.push({
        desc: `Удлинитель / нить / 1м / ${item.cable}`,
        keyValue: `${item.extensions_1m} шт`,
      });
      esExt.push({
        desc: `Удлинитель / нить / 3м / ${item.cable}`,
        keyValue: `${item.extensions_3m} шт`,
      });
      esExt.push({
        desc: `Удлинитель / нить / 5м / ${item.cable}`,
        keyValue: `${item.extensions_5m} шт`,
      });
      esExt.push({
        desc: `Удлинитель / нить / 10м / ${item.cable}`,
        keyValue: `${item.extensions_10m} шт`,
      });
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Занавес") {
      const item = itemObj.item as CurtainType;
      esExt.push({
        desc: `Удлинитель / занавес / 1м / ${item.cable}`,
        keyValue: `${item.extensions_1m} шт`,
      });
      esExt.push({
        desc: `Удлинитель / занавес / 3м / ${item.cable}`,
        keyValue: `${item.extensions_3m} шт`,
      });
    }
  });

  return esExt;
}

export function getRFPExtensions(allItems: CommonItemType[]) {
  let fringeExt = 0;
  let threadExt = 0;
  let fringeTee = 0;
  let threadTee = 0;
  let curtainExt = 0;
  let curtainTee = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const fringe = itemObj.item as FringeType;
      fringeExt +=
        fringe.extensions_1m * extPrice +
        fringe.extensions_3m * 3 * extPrice +
        fringe.extensions_5m * 5 * extPrice +
        fringe.extensions_10m * 10 * extPrice;
      fringeTee += fringe.tees * teePrice;
    }
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      threadExt +=
        thread.extensions_1m * extPrice +
        thread.extensions_3m * 3 * extPrice +
        thread.extensions_5m * 5 * extPrice +
        thread.extensions_10m * 10 * extPrice;
      threadTee += thread.tees * teePrice;
    }
    if (itemObj.itemTitle === "Занавес") {
      const curtain = itemObj.item as CurtainType;
      curtainExt +=
        curtain.extensions_1m * extPrice + curtain.extensions_3m * 3 * extPrice;
      curtainTee += curtain.tees * teePrice;
    }
  });

  const overall =
    fringeExt + threadExt + fringeTee + threadTee + curtainExt + curtainTee;
  return overall;
}
