import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { NeonType } from "../../Neon/model";

export function getEsPlugs(allItems: CommonItemType[]): EsWritingArrayType[] {
  const plugsArr: Pick<NeonType, "thickness" | "plugs">[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      const index = plugsArr.findIndex((el) => el.thickness === neon.thickness);
      if (~index) {
        plugsArr[index].plugs += neon.plugs;
      } else {
        plugsArr.push({
          thickness: neon.thickness,
          plugs: neon.plugs,
        });
      }
    }
  });

  const esPlugs: EsWritingArrayType[] = [];
  plugsArr.forEach((el) => {
    esPlugs.push({
      desc: `Заглушка / для неона / ${el.thickness} / LedMSK`,
      keyValue: `${el.plugs} шт`,
    });
  });

  return esPlugs;
}
