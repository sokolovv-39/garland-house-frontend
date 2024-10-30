import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { NeonThicknessEnum, NeonType } from "../../Neon/model";
import { PVSColorEnum } from "../../PVS";

export function getEsConnectingNeedles(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const needles: {
    quantity: number;
    thickness: NeonThicknessEnum;
  }[] = [];
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      const index = needles.findIndex((el) => el.thickness === neon.thickness);
      if (~index) {
        needles[index].quantity += neon.needles;
      } else {
        needles.push({
          quantity: neon.needles,
          thickness: neon.thickness,
        });
      }
    }
  });

  const es: EsWritingArrayType[] = [];

  needles.forEach((el) => {
    es.push({
      desc: `Соединительная игла / для неона / ${el.thickness}`,
      keyValue: `${el.quantity} шт`,
    });
  });

  return es;
}
