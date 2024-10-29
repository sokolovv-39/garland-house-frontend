import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import {
  BeltLightGlowShadeEnum,
  BeltLightLampStepEnum,
  BeltLightType,
} from "../model";
import { getBeltLightLength } from ".";
import { PVSColorEnum } from "../../PVS";

export function beltLightRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  const items: Pick<
    BeltLightType,
    "cable" | "glowShade" | "lampStep" | "length" | "price_20cm" | "price_40cm"
  >[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Белт-лайт") {
      const beltLight = itemObj.item as BeltLightType;
      const index = items.findIndex((el) => {
        if (
          el.cable === beltLight.cable &&
          el.glowShade === beltLight.glowShade &&
          el.lampStep === beltLight.lampStep
        )
          return true;
        else return false;
      });
      if (index !== -1) {
        items[index].length += beltLight.length;
      } else {
        items.push({
          length: beltLight.length,
          cable: beltLight.cable,
          glowShade: beltLight.glowShade,
          lampStep: beltLight.lampStep,
          price_20cm: beltLight.price_20cm,
          price_40cm: beltLight.price_40cm,
        });
      }
    }
  });

  const rfpItems: LineType[] = [];

  items.forEach((el, index) => {
    const beltLightMeters = el.length;

    let desc = "Монтаж светодиодной гирлянды Белт-лайт. Шаг между цоколями - ";
    if (el.lampStep === BeltLightLampStepEnum.cm_20) desc += "20см.";
    if (el.lampStep === BeltLightLampStepEnum.cm_40) desc += "40см.";
    desc += " Цоколь e27. Мощность лампочки 2Вт. Класс защиты IP65.";
    if (el.cable === PVSColorEnum.Black) desc += " Черный провод,";
    if (el.cable === PVSColorEnum.White) desc += " Белый провод,";
    if (
      el.glowShade === BeltLightGlowShadeEnum.Cold &&
      BeltLightGlowShadeEnum.Blue &&
      BeltLightGlowShadeEnum.Filament
    )
      desc += " холодное свечение лампочек";
    if (
      el.glowShade === BeltLightGlowShadeEnum.Warm &&
      BeltLightGlowShadeEnum.Red &&
      BeltLightGlowShadeEnum.Green
    )
      desc += " теплое свечение лампочек";

    let price =
      el.lampStep === BeltLightLampStepEnum.cm_20
        ? el.price_20cm
        : el.price_40cm;

    rfpItems.push({
      id: `${startId + index}`,
      desc,
      unit: "м.п",
      quantity: beltLightMeters.toString(),
      price: price.toString(),
      cost: `${beltLightMeters * price}`,
    });
  });

  return rfpItems;
}
