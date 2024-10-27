import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { FringeBracingEnum, FringeType } from "../../Fringe";
import { CommonItemType } from "../../Item";
import { ThreadBracingEnum, ThreadType } from "../../Thread";

export function getEsCableBrackets(
  allItems: CommonItemType[]
): EsWritingArrayType {
  let brackets = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const fringe = itemObj.item as FringeType;
      if (fringe.bracing === FringeBracingEnum.Bracket) {
        brackets += fringe.length * 5;
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      if (thread.bracing === ThreadBracingEnum.Brackets) {
        brackets += thread.length * 5;
      }
    }
  });

  const pack = 50;
  const packsQuantity = Math.ceil(brackets / pack);
  return {
    desc: `Скоба кабельная`,
    keyValue: `${packsQuantity} уп`,
  };
}
