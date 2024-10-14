import { PVSColorEnum, PVSType } from "./types";

export const pvsColors = Object.values(PVSColorEnum)

export const pvsDefault: PVSType = {
  title: "Кабель ПВС",
  length: 0,
  color: PVSColorEnum.Black
};
