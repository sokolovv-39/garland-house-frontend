import { PVSColorEnum } from "../../PVS";
import { Screed_480_500_Type } from "./types";

export const screed_480_500_colors = Object.values(PVSColorEnum);

export const Screed_480_500_default: Screed_480_500_Type = {
  title: "Стяжка 480-500мм",
  quantity: 0,
  price: 76,
  color: PVSColorEnum.White,
};
