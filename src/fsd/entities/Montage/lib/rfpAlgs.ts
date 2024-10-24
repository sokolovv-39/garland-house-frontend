import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { montageDefault, MontageType } from "../model";

export function montageRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  let m_16_20 = 0;
  let m_22_24 = 0;
  let m_26_36 = 0;
  let distance = 0;
  let m_26_36_hourly = 0;
  let climber = 0;
  let complex_fringe = 0;
  let complex_neon = 0;
  let complex_thread = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Монтаж") {
      const montage = itemObj.item as MontageType;
      m_16_20 += montage.m_16_20;
      m_22_24 += montage.m_22_24;
      m_26_36 += montage.m_26_36;
      distance += montage.distance;
      m_26_36_hourly += montage.m_26_36_hourly;
      climber += montage.climber;
      complex_fringe += montage.complex_fringe;
      complex_neon += montage.complex_neon;
      complex_thread += montage.complex_thread;
    }
  });

  const rfp: LineType[] = [];
  let id = startId;

  if (m_16_20) {
    rfp.push({
      id: id.toString(),
      desc: "Автовышка 16-20 метров (смена)",
      unit: "шт",
      quantity: m_16_20.toString(),
      price: montageDefault.priceObj.m_16_20.toString(),
      cost: (montageDefault.priceObj.m_16_20 * m_16_20).toString(),
    });
    id++;
  }

  if (m_22_24) {
    rfp.push({
      id: id.toString(),
      desc: "Автовышка 22-24 метра (смена)",
      unit: "шт",
      quantity: m_22_24.toString(),
      price: montageDefault.priceObj.m_22_24.toString(),
      cost: (montageDefault.priceObj.m_22_24 * m_22_24).toString(),
    });
    id++;
  }

  if (m_26_36) {
    rfp.push({
      id: id.toString(),
      desc: "Автовышка 26-36 метров (смена)",
      unit: "шт",
      quantity: m_26_36.toString(),
      price: montageDefault.priceObj.m_26_36.toString(),
      cost: (montageDefault.priceObj.m_26_36 * m_26_36).toString(),
    });
    id++;
  }

  if (distance) {
    rfp.push({
      id: id.toString(),
      desc: "Монтаж оборудования с выездом на объект",
      unit: "км",
      quantity: distance.toString(),
      price: montageDefault.priceObj.distance.toString(),
      cost: (montageDefault.priceObj.distance * distance).toString(),
    });
    id++;
  }

  if (m_26_36_hourly) {
    rfp.push({
      id: id.toString(),
      desc: "Автовышка 26-36 метров почасовая оплата свыше 7 часов смены",
      unit: "час",
      quantity: m_26_36_hourly.toString(),
      price: montageDefault.priceObj.m_26_36_hourly.toString(),
      cost: (
        montageDefault.priceObj.m_26_36_hourly * m_26_36_hourly
      ).toString(),
    });
    id++;
  }

  if (climber) {
    rfp.push({
      id: id.toString(),
      desc: "Альпинист (смена)",
      unit: "руб",
      quantity: climber.toString(),
      price: climber.toString(),
      cost: climber.toString(),
    });
    id++;
  }

  if (complex_fringe || complex_neon || complex_thread) {
    let quantity = complex_fringe + complex_neon + complex_thread;
    let cost =
      complex_fringe * montageDefault.priceObj.complex_fringe +
      complex_neon * montageDefault.priceObj.complex_neon +
      complex_thread * montageDefault.priceObj.complex_thread;
    rfp.push({
      id: id.toString(),
      desc: "Монтаж сложного участка (на дюбеля В ФАСАД, монтаж с неудобной крыши, с применением обвязки альпснаряжения)",
      unit: "м.п",
      quantity: quantity.toString(),
      price: montageDefault.priceObj.complex_fringe.toString(),
      cost: cost.toString(),
    });
    id++;
  }

  return rfp;
}
