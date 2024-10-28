import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { PVSColorEnum } from "../../PVS";
import { ThreadScreedsTypeEnum, ThreadType } from "../../Thread";
import { Screed_200_Type } from "../model";
import { NeonType } from "../../Neon/model";
import {
  CurtainBracingEnum,
  CurtainCableEnum,
  CurtainType,
} from "../../Curtain";

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
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      if (neon.isScreeds_200mm) {
        const index = screeds.findIndex(
          (screed) => screed.color === PVSColorEnum.White
        );
        if (~index) {
          screeds[index].quantity += neon.length * 5;
        } else {
          screeds.push({
            color: PVSColorEnum.White,
            quantity: neon.length * 5,
          });
        }
      }
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Занавес") {
      const curtain = itemObj.item as CurtainType;
      if (curtain.bracing === CurtainBracingEnum.Screed) {
        let curtainCable: PVSColorEnum;
        if (curtain.cable === CurtainCableEnum.Black)
          curtainCable = PVSColorEnum.Black;
        if (
          curtain.cable === CurtainCableEnum.White ||
          curtain.cable === CurtainCableEnum.Transparent
        )
          curtainCable = PVSColorEnum.White;

        const index = screeds.findIndex(
          (screed) => screed.color === curtainCable
        );
        if (~index) {
          screeds[index].quantity += 2 * 2 * 5;
        } else {
          screeds.push({
            color: curtainCable!,
            quantity: 2 * 2 * 5,
          });
        }
      }
    }
  });

  const pack = 100;

  const esScreeds: EsWritingArrayType[] = screeds.map((screed) => {
    let color = PVSColorEnum.Black;
    if (screed.color === PVSColorEnum.White) color = screed.color;
    return {
      desc: `Стяжка 200 мм / ${color}`,
      keyValue: `${Math.ceil(screed.quantity / pack)} уп`,
    };
  });

  return esScreeds;
}

export function screed_200_custom_es(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  const screeds: Array<{
    color: PVSColorEnum;
    quantity: number;
  }> = [];
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Стяжка 200мм") {
      const screed = itemObj.item as Screed_200_Type;
      const index = screeds.findIndex((el) => el.color === screed.color);
      if (~index) {
        screeds[index].quantity += screed.quantity;
      } else {
        screeds.push({
          color: screed.color,
          quantity: screed.quantity,
        });
      }
    }
  });

  const rfp: EsWritingArrayType[] = [];
  screeds.forEach((el) => {
    rfp.push({
      desc: `Стяжки 200м / ${el.color}`,
      keyValue: `${el.quantity} шт`,
    });
  });

  return rfp;
}
