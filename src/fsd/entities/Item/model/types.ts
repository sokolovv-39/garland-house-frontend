import { BeltLightType } from "../../BeltLight";
import { BoxPVSType } from "../../BoxPVS";
import { CorrugationType } from "../../CorrugationPVS";
import { CurtainType } from "../../Curtain";
import { FringeType } from "../../Fringe";
import { NeonType } from "../../Neon/model";
import { PVSType } from "../../PVS";
import { RopeType } from "../../Rope";
import { SolderBoxType } from "../../SolderBox";
import { ThreadType } from "../../Thread";
import { RelaysSwitchesType } from "../../RelaysSwitches";
import { VagiType } from "../../Vagi";
import { Screed_480_500_Type } from "../../Screed_480_500";
import { Screed_200_Type } from "../../Screed_200";

export type ItemTitleType =
  | "Бахрома"
  | "Гибкий неон"
  | "Нить"
  | "Белт-лайт"
  | "Занавес"
  | "Трос"
  | "Кабель ПВС"
  | "Гофра для кабеля ПВС"
  | "Кабель-канал (короб) для кабеля ПВС"
  | "Реле и выключатели"
  | "Распаячная коробка"
  | "Ваги (клемма)"
  | "Стяжка 480-500мм"
  | "Стяжка 200мм";

export type AllItemsTypes =
  | FringeType
  | NeonType
  | ThreadType
  | BeltLightType
  | CurtainType
  | RopeType
  | PVSType
  | CorrugationType
  | BoxPVSType
  | RelaysSwitchesType
  | SolderBoxType
  | VagiType
  | Screed_480_500_Type| Screed_200_Type

export type ItemType<T extends AllItemsTypes> = {
  id: string;
  itemTitle: ItemTitleType;
  item: T;
  objectId: string;
  orderId: number;
};

export type CommonItemType = ItemType<AllItemsTypes>;
