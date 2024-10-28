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
  priceObj: {
    m_8_16: number;
    m_14_25: number;
    m_8_16_prof: number;
    m_14_25_prof: number;
  };
  extensions_1m: number;
  ral: string;
  ral_meters: number;
  no_ral_meters: number;
  plugs: number;
  isScreeds_200mm: boolean;
};
