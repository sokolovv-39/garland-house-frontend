"use client";

import { Button, IDBContext, Input } from "@/fsd/shared";
import classes from "./OrdersTableControl.module.scss";
import Refresh from "./images/refresh.svg";
import Image from "next/image";
import { useContext } from "react";
import { useRouter } from "nextjs-toploader/app";
import { defaultOrder } from "../../model";
import { nanoid } from "nanoid";

export function OrdersTableControl({searchCallback} : {searchCallback: (val: string) => void}) {
  const idb = useContext(IDBContext);
  const router = useRouter();

  function addOrder() {
    idb?.orders.getAll().then((orders) => {
      let order = defaultOrder;

      const numberOfOrder = orders.length
        ? orders[orders.length - 1].numberOfOrder + 1
        : 1;
      order = {
        ...order,
        id: nanoid(),
        numberOfOrder,
      };

      idb.orders
        .add(order)
        .then(() => {
          router.push(`orders/${order.numberOfOrder}/basic`);
        })
        .catch((err) => console.error(err));
    });
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
