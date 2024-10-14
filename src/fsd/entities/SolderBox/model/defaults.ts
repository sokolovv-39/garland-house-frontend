import { SolderBoxColorEnum, SolderBoxType } from "./types";

export const solderBoxColors = Object.values(SolderBoxColorEnum);

export const solderBoxDefault: SolderBoxType = {
  title: "Распаячная коробка",
  color: SolderBoxColorEnum.Black,
};
