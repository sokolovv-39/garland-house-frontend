import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { RopeThicknessEnum, RopeType } from "../model";
import { FringeBracingEnum, FringeType } from "../../Fringe";
import { ThreadBracingEnum, ThreadType } from "../../Thread";
import { CurtainBracingEnum, CurtainType } from "../../Curtain";

export function getRopeLength(length: number, contours: number) {
  let reserved = 1.1 * length;
  return reserved;
}

export function getRopeRings(length: number, contours: number) {
  let ringsQuantity = length + contours;
  return ringsQuantity;
}

export function getRopeLanyards(contours: number) {
  return contours;
}

export function getRopeDuplexClamps(contours: number) {
  let duplexClamps = contours * 2;
  return duplexClamps;
}

export function getEsRope(allItems: CommonItemType[]): EsWritingArrayType[] {
  const ropes: Pick<RopeType, "thickness" | "length">[] = [];
  const esRopes: EsWritingArrayType[] = [];

  //Бахрома добавляет трос
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const fringe = itemObj.item as FringeType;
      if (fringe.bracing === FringeBracingEnum.Rope) {
        const ropeIndex = ropes.findIndex(
          (rope) => rope.thickness === RopeThicknessEnum.mm_2
        );
        if (ropeIndex !== -1) {
          ropes[ropeIndex].length += getRopeLength(fringe.length, 0);
        } else {
          ropes.push({
            length: getRopeLength(fringe.length, 0),
            thickness: RopeThicknessEnum.mm_2,
          });
        }
      }
    }
  });
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      if (thread.bracing === ThreadBracingEnum.Rope) {
        const ropeIndex = ropes.findIndex(
          (rope) => rope.thickness === RopeThicknessEnum.mm_2
        );
        if (ropeIndex !== -1)
          ropes[ropeIndex].length += getRopeLength(thread.length, 0);
        else {
          ropes.push({
            length: getRopeLength(thread.length, 0),
            thickness: RopeThicknessEnum.mm_2,
          });
        }
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Занавес") {
      const curtain = itemObj.item as CurtainType;
      if (curtain.bracing === CurtainBracingEnum.Rope) {
        const ropeIndex = ropes.findIndex(
          (rope) => rope.thickness === RopeThicknessEnum.mm_3
        );
        if (ropeIndex !== -1) ropes[ropeIndex].length += 5;
        else
          ropes.push({
            length: 5,
            thickness: RopeThicknessEnum.mm_3,
          });
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Трос") {
      const rope = itemObj.item as RopeType;
      const index = ropes.findIndex((el) => el.thickness === rope.thickness);
      if (~index) {
        ropes[index].length += getRopeLength(rope.length, 0);
      } else {
        ropes.push({
          length: getRopeLength(rope.length, 0),
          thickness: rope.thickness,
        });
      }
    }
  });

  ropes.forEach((item) => {
    esRopes.push({
      desc: `Трос / ${item.thickness}`,
      keyValue: `${item.length} м`,
    });
  });

  return esRopes;
}
