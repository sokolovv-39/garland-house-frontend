import { CommonItemType } from "../../Item";
import { RelaysSwitchesType } from "../model";

export function getRelaysSwitches(allItems: CommonItemType[]) {
  let relaysSwitches = {
    wireless_1: 0,
    wireless_2: 0,
    wireless_3: 0,
    wireless_1_wifi: 0,
    wireless_2_wifi: 0,
    wireless_3_wifi: 0,
    astroRelay: 0,
    photoRelay: 0,
    default_1: 0,
    default_2: 0,
    relays: 0,
  };

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Реле и выключатели") {
      const typedItem = itemObj.item as RelaysSwitchesType;

      relaysSwitches.wireless_1 += typedItem.wireless_1;
      if (typedItem.wireless_1) relaysSwitches.relays += typedItem.wireless_1;
      relaysSwitches.wireless_2 += typedItem.wireless_2;
      if (typedItem.wireless_2)
        relaysSwitches.relays += typedItem.wireless_2 * 2;
      relaysSwitches.wireless_3 += typedItem.wireless_3;
      if (typedItem.wireless_3)
        relaysSwitches.relays += typedItem.wireless_3 * 3;
      relaysSwitches.wireless_1_wifi += typedItem.wireless_1_wifi;
      if (typedItem.wireless_1_wifi)
        relaysSwitches.relays += typedItem.wireless_1_wifi;
      relaysSwitches.wireless_2_wifi += typedItem.wireless_2_wifi;
      if (typedItem.wireless_2_wifi)
        relaysSwitches.relays += typedItem.wireless_2_wifi * 2;
      relaysSwitches.wireless_3_wifi += typedItem.wireless_3_wifi;
      if (typedItem.wireless_3_wifi)
        relaysSwitches.relays += typedItem.wireless_3_wifi * 3;
      relaysSwitches.photoRelay += typedItem.photoRelay;
      relaysSwitches.astroRelay += typedItem.astroRelay;
      relaysSwitches.default_1 += typedItem.default_1;
      relaysSwitches.default_2 += typedItem.default_2;
    }
  });
  return relaysSwitches;
}
