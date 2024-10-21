import { CommonItemType } from "../../Item";

export function getEsExtensions(allItems: CommonItemType[]) {
  let white_extensions_1m = 0;
  let white_extensions_3m = 0;
  let white_extensions_5m = 0;
  let white_extensions_10m = 0;
  let black_extensions_1m = 0;
  let black_extensions_3m = 0;
  let black_extensions_5m = 0;
  let black_extensions_10m = 0;

  allItems.forEach((itemObj) => {
    const item = itemObj.item;

    if ("cable" in item) {
      const extensions_1m = "extensions_1m" in item ? item.extensions_1m : 0;
      const extensions_3m = "extensions_3m" in item ? item.extensions_3m : 0;
      const extensions_5m = "extensions_5m" in item ? item.extensions_5m : 0;
      const extensions_10m = "extensions_10m" in item ? item.extensions_10m : 0;

      if (item.cable === "Белый") {
        white_extensions_1m += extensions_1m;
        white_extensions_3m += extensions_3m;
        white_extensions_5m += extensions_5m;
        white_extensions_10m += extensions_10m;
      } else if (item.cable === "Черный") {
        black_extensions_1m += extensions_1m;
        black_extensions_3m += extensions_3m;
        black_extensions_5m += extensions_5m;
        black_extensions_10m += extensions_10m;
      }
    }
  });

  return {
    white_extensions_1m,
    white_extensions_3m,
    white_extensions_5m,
    white_extensions_10m,
    black_extensions_1m,
    black_extensions_3m,
    black_extensions_5m,
    black_extensions_10m,
  };
}
