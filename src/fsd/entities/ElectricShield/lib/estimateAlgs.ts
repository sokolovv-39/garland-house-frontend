import { CommonItemType } from "../../Item";
import { ElectricShieldType } from "../model";

export function getEsElectricShield(allItems: CommonItemType[]) {
  let electricShield = {
    street_shield_ip65: 0,
    automat_10A: 0,
    voltage_relay: 0,
  };

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Электрический щиток") {
      const shield = itemObj.item as ElectricShieldType;
      electricShield = {
        street_shield_ip65: shield.quantity,
        automat_10A: shield.quantity,
        voltage_relay: shield.quantity,
      };
    }
  });

  return electricShield;
}
