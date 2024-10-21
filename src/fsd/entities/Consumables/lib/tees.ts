import { CommonItemType } from "../../Item";

export function getEsTees(allItems: CommonItemType[]) {
  let black_tees = 0;
  let white_tees = 0;

  allItems.forEach((itemObj) => {
    const item = itemObj.item;
    if ("cable" in item) {
      const tees = "tees" in item ? (item.tees as number) : 0;

      if (item.cable === "Черный") {
        black_tees += tees;
      } else if (item.cable === "Белый") {
        white_tees += tees;
      }
    }
  });

  return {
    black_tees,
    white_tees,
  };
}
