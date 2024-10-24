import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { NeonType } from "../../Neon/model";

export function getEsMetalProfile(
  allItems: CommonItemType[]
): EsWritingArrayType {
  let profLength = 0;
  let ral = null;
  let ral_meters = null;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      profLength += Math.ceil(1.1 * neon.length);
      if (neon.painting) {
        ral = neon.ral;
        ral_meters = neon.ral_meters;
      }
    }
  });

  const pack = 2;
  const packsQuantity = Math.ceil(profLength / pack);
  const profMeters = pack * packsQuantity;

  return {
    keyValue: `${profMeters} м`,
    desc: `Профиль металлический / 2 м${
      ral ? `/ Покраска ${ral_meters} м / RAL ${ral}` : ""
    }`,
  };
}
