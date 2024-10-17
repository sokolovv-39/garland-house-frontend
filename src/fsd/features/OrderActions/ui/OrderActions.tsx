"use client";

import { IndexedDB } from "../../IndexedDB";
import { generateEstimate, generateRFP } from "../lib";
import classes from "./OrderActions.module.scss";
import { Button } from "@/fsd/shared";
import { useRouter } from "nextjs-toploader/app";

export function OrderActions({
  orderId,
  idb,
}: {
  orderId: number;
  idb: IndexedDB;
}) {
  const router = useRouter();

  async function deleteOrder() {
    const order = await idb.orders.get(orderId);
    await idb.orders.delete(order.id);
    router.push("/orders");
  }

  async function getRFP() {
    const favMeasure = (await idb.measures.getOwn(orderId)).find(
      (measure) => measure.isFavourite
    );
    if (favMeasure) {
      generateRFP(idb, favMeasure.id);
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.download}>
        <Button mode="beige" click={getRFP} type="button">
          Скачать КП
        </Button>
        <Button
          mode="beige"
          click={() => generateEstimate(idb, orderId)}
          type="button"
        >
          Скачать смету
        </Button>
      </div>
      <Button mode="red" click={deleteOrder} type="button">
        Удалить заказ
      </Button>
    </div>
  );
}
