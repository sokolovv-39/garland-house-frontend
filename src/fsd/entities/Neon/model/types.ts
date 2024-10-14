export enum NeonGlowShadeEnum {
  Warm = "Теплый",
  Cold = "Холодный",
  Red = 'Красный',
  Green = 'Зеленый',
  Blue = 'Синий',
  Pink = 'Розовый',
  Orange = 'Оранжевый'
}

export enum NeonThicknessEnum {
  Small = "8x15 мм",
  Big = "15x25 мм",
}

export enum NeonBracingEnum {
  Meters_1 = "1 метр",
  Meters_2 = "2 метра",
}

export type NeonType = {
  title: "Гибкий неон";
  length: number;
  glowShade: NeonGlowShadeEnum;
  thickness: NeonThicknessEnum;
  bracing: NeonBracingEnum;
  painting: boolean;
  extensionQuantity: number;
  needles: number;
  powerQuantity: number;
  contours: number;
};
