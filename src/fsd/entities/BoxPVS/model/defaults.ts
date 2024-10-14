import { BoxPVSColourEnum, BoxPVSType } from "./types";

export const boxPvsColours = Object.values(BoxPVSColourEnum);

export const boxPvsDefault: BoxPVSType = {
  title: "Кабель-канал (короб) для кабеля ПВС",
  color: BoxPVSColourEnum.Black,
};
