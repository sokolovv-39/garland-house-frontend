import { RopeSurfaceEnum, RopeThicknessEnum, RopeType } from "./types";

export const ropeThicknessDefault = Object.values(RopeThicknessEnum);
export const ropeSurfaces = Object.values(RopeSurfaceEnum);

export const ropeDefault: RopeType = {
  title: "Трос",
  thickness: RopeThicknessEnum.mm_2,
  contours: 1,
  length: 0,
  surface: RopeSurfaceEnum.Wood,
  price: 432,
};
