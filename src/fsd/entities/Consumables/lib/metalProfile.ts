import { EsWritingArrayType } from "@/fsd/features/OrderActions/model";
import { CommonItemType } from "../../Item";
import { NeonType } from "../../Neon/model";
import { getNeonLength } from "../../Neon";

export function getEsMetalProfile(
  allItems: CommonItemType[]
): EsWritingArrayType[] {
  let ral = "";
  let ral_meters = 0;
  let no_ral_meters = 0;

  allItems.forEach((itemObj) => {
    if (itemObj.itemTitle === "Гибкий неон") {
      const neon = itemObj.item as NeonType;
      if (neon.painting) {
        ral = neon.ral;
        ral_meters += neon.ral_meters;
        no_ral_meters += neon.no_ral_meters;
      } else {
        no_ral_meters += getNeonLength(neon.length).skeinMeters;
      }
    }
  });

  const pack = 2;
  const no_ral_packs = Math.ceil(no_ral_meters / pack);
  const no_ral_packs_meters = no_ral_packs * pack;
  const ral_packs = Math.ceil(ral_meters / pack);
  const ral_packs_meters = ral_packs * pack;

  return [
    {
      keyValue: `${no_ral_packs_meters} м`,
      desc: `Профиль металлический / 2 м / непокрашенный`,
    },
    {
      keyValue: `${ral_packs_meters} м`,
      desc: `Профиль металлический / 2 м / покрашенный / RAL ${ral}`,
    },
  ];
}
