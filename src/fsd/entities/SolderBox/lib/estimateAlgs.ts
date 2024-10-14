import { CommonItemType } from "../../Item";

export function getSolderBoxPieces(allItems: CommonItemType[]) {
  let contours = 0;

  allItems.forEach((itemObj) => {
    if (Object.hasOwn(itemObj.item, "contours")) {
      const itemWithContours = itemObj.item as {
        contours: number;
      };
      contours += itemWithContours.contours;
    }
  });
    
    return contours
}
