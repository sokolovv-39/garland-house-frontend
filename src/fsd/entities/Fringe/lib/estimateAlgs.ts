import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { FringeType } from "../model";

export function getFringeLength(length: number) {
  const skeinLength = 5;
  let skeinQuantity = Math.ceil(length / 5);

  if (length < 50) skeinQuantity += 2;
  else if (length < 100) skeinQuantity += 4;
  else if (length < 150) skeinQuantity += 5;
  else if (length < 200) skeinQuantity += 6;
  else {
    const reserved = length * 0.1;
    const reservedSkeinQuantity = Math.ceil(reserved / skeinLength);
    skeinQuantity += reservedSkeinQuantity;
  }

  const skeinMeters = skeinQuantity * skeinLength;

  return { skeinQuantity, skeinMeters };
}

export function getFringeBracketsPacks(length: number) {
  const brackets = length * 5;
  const pack = 50;
  const quantity = Math.ceil(brackets / pack);
  return quantity;
}

export function getEsFringe(allItems: CommonItemType[]): EsWritingArrayType[] {
  const fringes: FringeType[] = [];
  const esFringes: EsWritingArrayType[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const fringe = itemObj.item as FringeType;
      let existIndex = fringes.findIndex((item) => {
        if (
          item.glowShade === fringe.glowShade &&
          item.glowMode === fringe.glowMode &&
          item.cable === fringe.cable &&
          item.led === fringe.led
        )
          return true;
        else return false;
      });
      if (existIndex !== -1) {
        fringes[existIndex].length += fringe.length;
      } else {
        fringes.push(fringe);
      }
    }
  });

  fringes.forEach((fringe) => {
    esFringes.push({
      desc: `${fringe.title} / ${fringe.glowShade} / ${fringe.glowMode} / ${fringe.cable} / ${fringe.led}`,
      keyValue: `${getFringeLength(fringe.length).skeinMeters} м`,
    });
  });

  return esFringes;
}
