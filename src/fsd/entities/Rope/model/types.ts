export enum RopeThicknessEnum {
  mm_2 = "2 мм",
  mm_3 = "3 мм",
}

export enum RopeSurfaceEnum {
  Wood = "Дерево",
  Concrete = "Бетон",
}

export type RopeType = {
  title: "Трос";
  length: number;
  thickness: RopeThicknessEnum;
  contours: number;
  surface: RopeSurfaceEnum;
};
