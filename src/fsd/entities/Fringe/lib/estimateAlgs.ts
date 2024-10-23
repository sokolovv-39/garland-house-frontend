import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { FringeMultiplicityEnum, FringeType } from "../model";

export function getFringeLength(length: number, mult: FringeMultiplicityEnum) {
  let skeinLength = 0;
  if (mult === FringeMultiplicityEnum.m_3) skeinLength = 3;
  else if (mult === FringeMultiplicityEnum.m_5) skeinLength = 5;
  let skeinQuantity = Math.ceil(length / 5);

  let skeinMeters = 0;
  if (length === 0) return { skeinQuantity, skeinMeters };
  else if (length < 50) skeinQuantity += 2;
  else if (length < 100) skeinQuantity += 4;
  else if (length < 150) skeinQuantity += 5;
  else if (length < 200) skeinQuantity += 6;
  else {
    const reserved = length * 0.1;
    const reservedSkeinQuantity = Math.ceil(reserved / skeinLength);
    skeinQuantity += reservedSkeinQuantity;
  }

  skeinMeters = skeinQuantity * skeinLength;

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
      desc: `${fringe.title} / ${fringe.glowShade} / ${fringe.glowMode} / ${fringe.cable} / ${fringe.led} / Кратность ${fringe.multiplicity}`,
      keyValue: `${
        getFringeLength(fringe.length, fringe.multiplicity).skeinQuantity
      } шт`,
    });
  });

  return esFringes;
}
