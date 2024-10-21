import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { SolderBoxColorEnum, SolderBoxType } from "../model";

export function getSolderBoxPieces(
  allItems: CommonItemType[]
): EsWritingArrayType {
  let contours = 0;

  allItems.forEach((itemObj) => {
    if (Object.hasOwn(itemObj.item, "contours")) {
      const itemWithContours = itemObj.item as {
        contours: number;
      };
      contours += itemWithContours.contours;
    }
  });

  let solderBoxColor = SolderBoxColorEnum.Black;

  const result = allItems.find(
    (itemObj) => itemObj.itemTitle === "Распаячная коробка"
  );
  if (result) {
    const solderBox = result.item as SolderBoxType;
    solderBoxColor = solderBox.color;
  }

  return {
    desc: `Распаячная коробка / 100х100х50 / ${solderBoxColor}`,
    keyValue: `${contours} шт`,
  };
}
