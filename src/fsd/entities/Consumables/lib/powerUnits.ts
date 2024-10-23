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
    if (
      itemObj.itemTitle === "Бахрома" ||
      itemObj.itemTitle === "Гибкий неон" ||
      itemObj.itemTitle === "Нить"
    ) {
      const powerUnits = (
        itemObj.item as {
          powerUnits: number;
        }
      ).powerUnits;
      const existIndex = esPowerUnits.findIndex((el) =>
        el.desc.includes(itemObj.itemTitle)
      );
      if (existIndex !== -1) {
        const val = parseInt(esPowerUnits[existIndex].keyValue);
        esPowerUnits[existIndex].keyValue = `${val + 1} шт`;
      } else {
        esPowerUnits.push({
          desc: `Блок питания / ${itemObj.itemTitle}`,
          keyValue: `1 шт`,
        });
      }
    }
  });

  return esPowerUnits;
}
