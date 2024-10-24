export enum NeonGlowShadeEnum {
  Warm = "Теплый",
  Cold = "Холодный",
  Red = "Красный",
  Green = "Зеленый",
  Blue = "Синий",
  Pink = "Розовый",
  Orange = "Оранжевый",
}

export enum NeonThicknessEnum {
  Small = "8x16 мм",
  Big = "14x25 мм",
}

export type NeonType = {
  title: "Гибкий неон";
  length: number;
  glowShade: NeonGlowShadeEnum;
  thickness: NeonThicknessEnum;
  painting: boolean;
  needles: number;
  powerUnits: number;
  contours: number;
  price: number;
  extensions_1m: number;
  ral: string;
  ral_meters: number;
  profile_price: number;
  plugs: number;
};
