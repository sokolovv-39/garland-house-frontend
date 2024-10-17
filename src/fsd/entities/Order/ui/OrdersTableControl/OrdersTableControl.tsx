"use client";

import { Button, DateFormatter, IDBContext, Input } from "@/fsd/shared";
import classes from "./OrdersTableControl.module.scss";
import Refresh from "./images/refresh.svg";
import Image from "next/image";
import { useContext, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { defaultOrder, OrderType } from "../../model";
import { nanoid } from "nanoid";

export function OrdersTableControl({
  searchCallback,
  searchVal,
}: {
  searchCallback: (val: string) => void;
  searchVal: string;
}) {
  const idb = useContext(IDBContext);
  const router = useRouter();

  async function addOrder() {
    const orders = await idb!.orders.getAll();
    console.log(orders);
    const sorted = orders.sort((order1, order2) => {
      if (order1.numberOfOrder > order2.numberOfOrder) return 1;
      else if (order1.numberOfOrder < order2.numberOfOrder) return -1;
      return 0;
    });
    const numberOfOrder = sorted.length
      ? sorted[sorted.length - 1].numberOfOrder + 1
      : 1;
    const newOrder: OrderType = {
      ...defaultOrder,
      id: nanoid(),
      numberOfOrder,
      measureDate: new DateFormatter(new Date()).dateToDMY(),
    };
    await idb!.orders.add(newOrder);
    router.push(`orders/${newOrder.numberOfOrder}/basic`);
  }

  return (
    <div className={classes.wrapper}>
      <Input
        type="search"
        placeholder="Поиск по номеру, адресу или имени"
        searchStyle={{
          flex: "1 0 auto",
        }}
        onChange={searchCallback}
        initialValue={searchVal}
      />
      <div className={classes.sync}>
        <Button
          style={{
            background: "rgba(197, 155, 104, 0.12)",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        >
          <Image src={Refresh} alt="" />
        </Button>
        <Button
          style={{
            color: "#8C1B1B",
            border: "1px solid rgba(241, 47, 47, 0.10)",
            background: "rgba(241, 47, 47, 0.10)",
            lineHeight: "100%",
            padding: "13px 16px",
          }}
        >
          Данные не синхронизированы
        </Button>
      </div>
      <Button click={addOrder}>Добавить замер</Button>
    </div>
  );
}
