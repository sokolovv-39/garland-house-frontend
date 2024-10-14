import { CommonItemType } from "../../Item";
import { Screed_480_500_Type } from "../model";

export function get_Screeds_480_500_quantity(allItems: CommonItemType[]) {
  let screeds = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Стяжка 480-500мм") {
      const typedItem = itemObj.item as Screed_480_500_Type;
      screeds += typedItem.quantity;
    }
  });

  return screeds;
}
