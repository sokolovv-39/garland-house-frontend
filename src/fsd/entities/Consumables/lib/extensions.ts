import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { FringeCableEnum, FringeType } from "../../Fringe";
import { BeltLightType } from "../../BeltLight";
import { NeonType } from "../../Neon/model";
import { ThreadType } from "../../Thread";

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
        desc: `Удлинитель / гибкий неон / 1м / ${item.glowShade}`,
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

  return esExt;
}
