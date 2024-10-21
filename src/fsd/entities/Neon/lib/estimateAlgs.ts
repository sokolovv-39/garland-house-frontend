import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { NeonType } from "../model";

export function getNeonLength(length: number) {
  const skein = 50;
  const reserved = length * 0.1;
  const skeinsQuantity = Math.ceil(length + reserved / skein);
  const skeinMeters = skein * skeinsQuantity;
  return { skeinsQuantity, skeinMeters };
}

export function getNeonProfile(length: number) {
  const skein = 2;
  const reserved = length * 0.1;
  const skeinsQuantity = Math.ceil(length + reserved / skein);
  return skeinsQuantity;
}

export function getNeonNeedles(contours: number) {
  return contours;
}

export function getNeonPlugs(contours: number) {
  return contours;
}

export function getEsNeon(allItems: CommonItemType[]): EsWritingArrayType[] {
  const neons: NeonType[] = [];
  const esNeons: EsWritingArrayType[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      let existIndex = neons.findIndex((item) => {
        if (
          item.glowShade === neon.glowShade &&
          item.thickness === neon.thickness
        )
          return true;
        else return false;
      });
      if (existIndex !== -1) {
        neons[existIndex].length += neon.length;
      } else {
        neons.push(neon);
      }
    }
  });

  neons.forEach((item) => {
    esNeons.push({
      desc: `${item.title} / ${item.glowShade} / ${
        item.thickness
      } / Покраска: ${item.painting ? "Да" : "Нет"}`,
      keyValue: `${getNeonLength(item.length).skeinMeters} м`,
    });
  });

  return esNeons;
}
