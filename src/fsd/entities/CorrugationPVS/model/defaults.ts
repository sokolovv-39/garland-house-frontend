import { CorrColorsEnum, CorrThicknessEnum, CorrugationType } from "./types";

export const corrThicknesses = Object.values(CorrThicknessEnum);
export const corrColours = Object.values(CorrColorsEnum);

export const corrugationDefault: CorrugationType = {
  title: "Гофра для кабеля ПВС",
  thickness: CorrThicknessEnum.mm_16,
  color: CorrColorsEnum.Black,
};
