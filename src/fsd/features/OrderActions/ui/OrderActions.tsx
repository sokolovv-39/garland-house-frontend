import { IndexedDB } from "../../IndexedDB";
import { generateEstimate } from "../lib";
import classes from "./OrderActions.module.scss";
import { Button } from "@/fsd/shared";

export function OrderActions({orderId, idb}:{orderId: number, idb: IndexedDB}) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.download}>
        <Button mode="beige">Скачать КП</Button>
        <Button mode="beige" click={() => generateEstimate(idb, orderId)} type="button">
          Скачать смету
        </Button>
      </div>
      <Button mode="red">Удалить заказ</Button>
    </div>
  );
}
