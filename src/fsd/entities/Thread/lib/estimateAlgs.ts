import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { ThreadBracingEnum, ThreadType } from "../model";

export function getThreadLength(length: number) {
  const skein = 10;
  let skeinsQuantity = Math.ceil(length / 10);
  const skeinMeters = skein * skeinsQuantity;
  return { skeinsQuantity, skeinMeters };
}

export function getThreadScreedsQuantity(length: number) {
  const screeds = length * 5;
  return screeds;
}

export function getEsThread(allItems: CommonItemType[]) {
  const threads: ThreadType[] = [];
  const esThreads: EsWritingArrayType[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      let existIndex = threads.findIndex((item) => {
        if (
          item.glowShade === thread.glowShade &&
          item.glowMode === thread.glowMode &&
          item.cable === thread.cable
        )
          return true;
        else return false;
      });
      if (existIndex !== -1) {
        threads[existIndex].length += thread.length;
      } else {
        threads.push(thread);
      }
    }
  });

  threads.forEach((item) => {
    esThreads.push({
      desc: `${item.title} / ${item.glowShade} / ${item.glowMode} / ${item.cable}`,
      keyValue: `${getThreadLength(item.length).skeinsQuantity} шт`,
    });
  });

  return esThreads;
}
