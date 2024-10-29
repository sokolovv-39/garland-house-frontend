import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import {
  FringeCableEnum,
  FringeGlowModeEnum,
  FringeGlowShadeEnum,
  FringeLedEnum,
  FringeMultiplicityEnum,
  FringeType,
} from "../model";
import { getFringeLength } from "./estimateAlgs";

export function fringeRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  const mergedItems: Array<
    Pick<
      FringeType,
      | "length"
      | "glowMode"
      | "glowShade"
      | "cable"
      | "led"
      | "price"
      | "pricePrem"
    >
  > = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Бахрома") {
      const item = itemObj.item as FringeType;
      const index = mergedItems.findIndex((el) => {
        if (
          el.glowMode === item.glowMode &&
          el.glowShade === item.glowShade &&
          el.cable === item.cable &&
          el.led === item.led
        )
          return true;
        else return false;
      });
      if (index !== -1) {
        mergedItems[index].length += item.length;
      } else {
        mergedItems.push({
          length: item.length,
          glowMode: item.glowMode,
          glowShade: item.glowShade,
          cable: item.cable,
          led: item.led,
          price: item.price,
          pricePrem: item.pricePrem,
        });
      }
    }
  });

  const rfpItems: LineType[] = [];

  mergedItems.forEach((item, index) => {
    const meters = item.length;

    let desc = `Монтаж бахромы${
      item.led === FringeLedEnum.led_200 ? '" ПРЕМИУМ "' : " "
    }светодиодной. Класс защиты IP65. Материал провода каучук.`;
    if (item.cable === FringeCableEnum.Black) desc += " Черный провод.";
    if (item.cable === FringeCableEnum.White) desc += " Белый провод.";
    if (item.glowShade === FringeGlowShadeEnum.RGB) desc += " RGB";
    if (item.glowShade === FringeGlowShadeEnum.Warm) desc += " Теплый свет";
    if (item.glowShade === FringeGlowShadeEnum.Cold) desc += " Холодный свет";
    if (
      item.glowMode === FringeGlowModeEnum.Static_glow &&
      item.glowShade !== FringeGlowShadeEnum.RGB
    )
      desc += " статика";
    if (
      item.glowMode === FringeGlowModeEnum.Flickering &&
      item.glowShade !== FringeGlowShadeEnum.RGB
    )
      desc += " с холодным мерцанием";

    let price =
      item.led === FringeLedEnum.led_200 ? item.pricePrem : item.price;

    rfpItems.push({
      id: `${startId + index}`,
      desc,
      unit: "м.п.",
      quantity: meters.toString(),
      price: price.toString(),
      cost: `${meters * price}`,
    });
  });

  return rfpItems;
}
