import { PVSColorEnum } from "../../PVS";

export enum BeltLightGlowShadeEnum {
  Warm = "Теплый",
  Cold = "Холодный",
  Blue = "Синий",
  Red = "Красный",
  Green = "Зеленый",
  Filament = "Филамент",
}

export enum BeltLightLampStepEnum {
  cm_20 = "20 см",
  cm_40 = "40 см",
}

export type BeltLightType = {
  title: "Белт-лайт";
  length: number;
  glowShade: BeltLightGlowShadeEnum;
  lampStep: BeltLightLampStepEnum;
  cable: PVSColorEnum;
  price: number;
  contours: number;
  pvsLength: number;
};
