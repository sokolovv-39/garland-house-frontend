export enum CorrThicknessEnum {
  mm_16 = "16 мм",
  mm_25 = "25 мм",
}

export enum CorrColorsEnum {
  Black = "Черный",
  White = "Белый",
}

export type CorrugationType = {
  title: "Гофра для кабеля ПВС";
  thickness: CorrThicknessEnum;
  color: CorrColorsEnum;
};
