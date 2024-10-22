import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { FringeType } from "../../Fringe";
import { NeonType } from "../../Neon/model";
import { ThreadType } from "../../Thread";

export function getEsPowerUnits(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const esPowerUnits: EsWritingArrayType[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const item = itemObj.item as FringeType;
      esPowerUnits.push({
        desc: "Блок питания / бахрома",
        keyValue: `${item.powerUnits} шт`,
      });
    }
  });
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const item = itemObj.item as NeonType;
      esPowerUnits.push({
        desc: "Блок питания / гибкий неон",
        keyValue: `${item.powerUnits} шт`,
      });
    }
  });
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const item = itemObj.item as ThreadType;
      esPowerUnits.push({
        desc: "Блок питания / нить",
        keyValue: `${item.powerUnits} шт`,
      });
    }
  });

  return esPowerUnits;
}
