import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { relaysSwitchesDefault, RelaysSwitchesType } from "../model";

export function switchesRfp(
  allItems: CommonItemType[],
  startId: number
): LineType[] {
  let wireless_1 = 0;
  let wireless_2 = 0;
  let wireless_3 = 0;
  let wireless_1_wifi = 0;
  let wireless_2_wifi = 0;
  let wireless_3_wifi = 0;
  let astroRelay = 0;
  let photoRelay = 0;
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Реле и выключатели") {
      const switchEl = itemObj.item as RelaysSwitchesType;
      wireless_1 += switchEl.wireless_1;
      wireless_2 += switchEl.wireless_2;
      wireless_3 += switchEl.wireless_3;
      wireless_1_wifi += switchEl.wireless_1_wifi;
      wireless_2_wifi += switchEl.wireless_2_wifi;
      wireless_3_wifi += switchEl.wireless_3_wifi;
      astroRelay += switchEl.astroRelay;
      photoRelay += switchEl.photoRelay;
    }
  });

  const rfp: LineType[] = [];

  let id = startId;

  if (wireless_1) {
    rfp.push({
      id: id.toString(),
      desc: "Монтаж беспроводного 1-клавишного выключателя + 1 радиореле",
      quantity: wireless_1.toString(),
      unit: "шт",
      price: relaysSwitchesDefault.priceObj.wireless_1.toString(),
      cost: (relaysSwitchesDefault.priceObj.wireless_1 * wireless_1).toString(),
    });
    id++;
  }

  if (wireless_2) {
    rfp.push({
      id: id.toString(),
      desc: "Монтаж беспроводного 2-клавишного выключателя + 2 радиореле",
      quantity: wireless_2.toString(),
      unit: "шт",
      price: relaysSwitchesDefault.priceObj.wireless_2.toString(),
      cost: (relaysSwitchesDefault.priceObj.wireless_2 * wireless_2).toString(),
    });
    id++;
  }

  if (wireless_3) {
    rfp.push({
      id: id.toString(),
      desc: "Монтаж беспроводного 3-клавишного выключателя + 3 радиореле",
      quantity: wireless_3.toString(),
      unit: "шт",
      price: relaysSwitchesDefault.priceObj.wireless_3.toString(),
      cost: (relaysSwitchesDefault.priceObj.wireless_3 * wireless_3).toString(),
    });
    id++;
  }

  if (wireless_1_wifi) {
    rfp.push({
      id: id.toString(),
      desc: "Монтаж беспроводного 1-клавишного выключателя + 1 радиореле + управление по Wi-fi через приложение",
      quantity: wireless_1_wifi.toString(),
      unit: "шт",
      price: relaysSwitchesDefault.priceObj.wireless_1_wifi.toString(),
      cost: (
        relaysSwitchesDefault.priceObj.wireless_1_wifi * wireless_1_wifi
      ).toString(),
    });
    id++;
  }

  if (wireless_2_wifi) {
    rfp.push({
      id: id.toString(),
      desc: "Монтаж беспроводного 2-клавишного выключателя + 2 радиореле + управление по Wi-fi через приложение",
      quantity: wireless_2_wifi.toString(),
      unit: "шт",
      price: relaysSwitchesDefault.priceObj.wireless_2_wifi.toString(),
      cost: (
        relaysSwitchesDefault.priceObj.wireless_2_wifi * wireless_2_wifi
      ).toString(),
    });
    id++;
  }

  if (wireless_3_wifi) {
    rfp.push({
      id: id.toString(),
      desc: "Монтаж беспроводного 3-клавишного выключателя + 3 радиореле + управление по Wi-fi через приложение",
      quantity: wireless_3_wifi.toString(),
      unit: "шт",
      price: relaysSwitchesDefault.priceObj.wireless_3_wifi.toString(),
      cost: (
        relaysSwitchesDefault.priceObj.wireless_3_wifi * wireless_3_wifi
      ).toString(),
    });
    id++;
  }

  if (photoRelay) {
    rfp.push({
      id: id.toString(),
      desc: "Монтаж фотореле. Класс защиты IP54. Мощность 2000Вт. Регулировка чувствительности",
      quantity: photoRelay.toString(),
      unit: "шт",
      price: relaysSwitchesDefault.priceObj.photoRelay.toString(),
      cost: (relaysSwitchesDefault.priceObj.photoRelay * photoRelay).toString(),
    });
    id++;
  }

  if (astroRelay) {
    rfp.push({
      id: id.toString(),
      desc: "Монтаж астрономического реле ",
      quantity: astroRelay.toString(),
      unit: "шт",
      price: relaysSwitchesDefault.priceObj.astroRelay.toString(),
      cost: (relaysSwitchesDefault.priceObj.astroRelay * astroRelay).toString(),
    });
    id++;
  }

  return rfp;
}
