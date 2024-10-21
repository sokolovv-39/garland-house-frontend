import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { BeltLightType } from "../../BeltLight";
import { CommonItemType } from "../../Item";
import { PVSColorEnum, PVSType } from "../model";
import { GetItemLengthType } from "../../Item/model";

function get_PVS_Skeins_Meters(
  length: number,
  color: PVSColorEnum
): GetItemLengthType {
  if (color === PVSColorEnum.Black) {
    const skein = 100;
    const skeinsQuantity = Math.ceil(length / skein);
    const skeinsMeters = skein * skeinsQuantity;
    return { skeinsQuantity, skeinsMeters };
  } else if (color === PVSColorEnum.White) {
    const skein = 50;
    const skeinsQuantity = Math.ceil(length / skein);
    const skeinsMeters = skein * skeinsQuantity;
    return { skeinsQuantity, skeinsMeters };
  } else return { skeinsQuantity: 0, skeinsMeters: 0 };
}

export function getEsPVS(allItems: CommonItemType[]) {
  const pvses: PVSType[] = [];
  const esPvses: EsWritingArrayType[] = [];

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Кабель ПВС") {
      const pvs = itemObj.item as PVSType;
      let existIndex = pvses.findIndex((item) => {
        if (item.color === pvs.color) return true;
        else return false;
      });
      if (existIndex !== -1) {
        pvses[existIndex].length += pvs.length;
      } else {
        pvses.push(pvs);
      }
    }
  });

  //Белт-лайт добавляет кабель
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Белт-лайт") {
      const beltLight = itemObj.item as BeltLightType;
      const pvsIndex = pvses.findIndex((pvs) => pvs.color === beltLight.cable);
      if (pvsIndex !== -1) {
        pvses[pvsIndex].length += beltLight.pvsLength;
      }
    }
  });

  pvses.forEach((item) => {
    esPvses.push({
      desc: `${item.title} / ${item.color}`,
      keyValue: `${get_PVS_Skeins_Meters(item.length, item.color)}`,
    });
  });

  return esPvses;
}

export function getPVSLength(allItems: CommonItemType[]) {
  let overall = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Кабель ПВС") {
      const pvs = itemObj.item as PVSType;
      overall += pvs.length;
    }
  });

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Белт-лайт") {
      const beltLight = itemObj.item as BeltLightType;
      overall += beltLight.pvsLength;
    }
  });

  return overall;
}
