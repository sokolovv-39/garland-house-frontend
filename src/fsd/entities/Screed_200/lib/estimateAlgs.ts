import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { PVSColorEnum } from "../../PVS";
import { ThreadScreedsTypeEnum, ThreadType } from "../../Thread";
import { Screed_200_Type } from "../model";

export function get_screeds_200_packs(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const screeds: Array<{
    color: PVSColorEnum;
    quantity: number;
  }> = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Нить") {
      const thread = itemObj.item as ThreadType;
      if (thread.screedsType === ThreadScreedsTypeEnum.Screed_200) {
        const screedsIndex = screeds.findIndex(
          (screed) => screed.color === thread.cable
        );
        if (screedsIndex !== -1) {
          screeds[screedsIndex].quantity += thread.length * 5;
        } else {
          screeds.push({
            color: thread.cable,
            quantity: thread.length * 5,
          });
        }
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Стяжка 200мм") {
      const item = itemObj.item as Screed_200_Type;

      const screedsIndex = screeds.findIndex(
        (screed) => screed.color === item.color
      );

      if (screedsIndex !== -1) {
        screeds[screedsIndex].quantity += item.quantity;
      } else {
        screeds.push({
          color: item.color,
          quantity: item.quantity,
        });
      }
    }
  });

  const pack = 100;

  const esScreeds: EsWritingArrayType[] = screeds.map((screed) => {
    let color = PVSColorEnum.Black;
    if (screed.color === PVSColorEnum.White) color = screed.color;
    return {
      desc: `Стяжка 200 мм / ${color}`,
      keyValue: `${Math.ceil(screed.quantity) / pack} уп`,
    };
  });

  return esScreeds;
}
