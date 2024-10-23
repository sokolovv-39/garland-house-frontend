import { LineType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { electricShieldDefault, ElectricShieldType } from "../model";

export function electricShieldRfp(
  allItems: CommonItemType[],
  id: number
): LineType {
  let quantity = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Электрический щиток") {
      const shield = itemObj.item as ElectricShieldType;
      quantity += shield.quantity;
    }
  });

  if (!quantity) quantity = 1;

  return {
    id: id.toString(),
    desc: `Монтаж щита уличного IP65 в сборе (автомат 10А, реле напряжения) и протяжка питания для подключения оборудования, коммутация, настройка`,
    unit: "шт",
    quantity: quantity.toString(),
    price: electricShieldDefault.price.toString(),
    cost: (quantity * electricShieldDefault.price).toString(),
  };
}
