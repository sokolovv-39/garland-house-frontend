import { PlusSVG, Select } from "@/fsd/shared";
import classes from "./PickItem.module.scss";
import { defaultItemTitles, ItemTitleType } from "../../model";

export function PickItem({ addItem }: { addItem: (val: string) => void }) {
  return (
    <Select
      type="Добавить гирлянду или расходник"
      values={defaultItemTitles}
      variant="plus"
      callback={addItem}
      saveType
    />
  );
}
