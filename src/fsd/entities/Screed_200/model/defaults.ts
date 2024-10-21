import { PVSColorEnum } from "../../PVS";
import { Screed_200_Type } from "./types";

export const screeds_200_colors = Object.values(PVSColorEnum);

export const screed_200_default: Screed_200_Type = {
  title: "Стяжка 200мм",
  quantity: 0,
  price: 97,
  color: PVSColorEnum.White,
};
