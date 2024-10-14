import { CommonItemType } from "../../Item";
import { Screed_200_Type } from "../model";

export function get_Screed_200_packs(allItems: CommonItemType[]) {
  let pack = 100

  let screeds = 0;
  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Стяжка 200мм") {
      const typedItem = itemObj.item as Screed_200_Type;
      screeds += typedItem.quantity;
    }
  });
    const packsQuantity = Math.ceil(screeds / pack)  

    return packsQuantity
}
