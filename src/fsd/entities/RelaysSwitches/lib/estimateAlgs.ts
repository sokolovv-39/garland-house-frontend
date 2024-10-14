import { CommonItemType } from "../../Item";
import { RelaysSwitchesType } from "../model";

export function getRelaysSwitches(allItems: CommonItemType[]) {
  let relaysSwitches = {
    wired: 0,
    wirelessRadio: 0,
    wirelessWifi: 0,
    astroRelay: 0,
  };

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Реле и выключатели") {
      const typedItem = itemObj.item as RelaysSwitchesType;

      relaysSwitches.wired += typedItem.wired;
      relaysSwitches.wirelessRadio += typedItem.wirelessRadio;
      relaysSwitches.wirelessWifi += typedItem.wirelessWifi;
      relaysSwitches.astroRelay += typedItem.astroRelay;
    }
  });
  return relaysSwitches;
}
