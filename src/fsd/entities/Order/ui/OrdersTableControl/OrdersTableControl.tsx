"use client";

import { api, Button, DateFormatter, IDBContext, Input } from "@/fsd/shared";
import classes from "./OrdersTableControl.module.scss";
import Refresh from "./images/refresh.svg";
import Image from "next/image";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { defaultOrder, OrderType } from "../../model";
import { nanoid } from "nanoid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SyncTextType =
  | "Данные не синхронизированы"
  | "Синхронизировано"
  | "Загрузка...";

const syncStyles: {
  noSync: CSSProperties;
  sync: CSSProperties;
  pending: CSSProperties;
} = {
  noSync: {
    color: "#8C1B1B",
    border: "1px solid rgba(241, 47, 47, 0.10)",
    background: "rgba(241, 47, 47, 0.10)",
    lineHeight: "100%",
    padding: "13px 16px",
    width: "240px",
  },
  sync: {
    color: "#1B8C1F",
    border: "1px solid rgba(47, 241, 53, 0.12)",
    background: "rgba(47, 241, 53, 0.12)",
    lineHeight: "100%",
    padding: "13px 16px",
    width: "240px",
  },
  pending: {
    color: "#8C6E1B",
    border: "1px solid rgba(241, 194, 47, 0.10)",
    background: "rgba(241, 194, 47, 0.15)",
    lineHeight: "100%",
    padding: "13px 16px",
    width: "240px",
  },
};

export function OrdersTableControl({
  searchCallback,
  searchVal,
  isSynchronized,
  isPendingOrders,
}: {
  searchCallback: (val: string) => void;
  searchVal: string;
  isSynchronized: boolean;
  isPendingOrders: boolean;
}) {
  const [syncStyle, setSyncStyle] = useState<CSSProperties>(syncStyles.noSync);
  const [sync, setSync] = useState<SyncTextType>("Данные не синхронизированы");
  const queryClient = useQueryClient();
  const idb = useContext(IDBContext);
  const router = useRouter();
  const addOrderQuery = useMutation({
    mutationFn: async () => {
      return await new Promise((resolve) => resolve("data"));
    },
  });

  async function addOrder() {
    const orders = await idb!.orders.getAll();
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
    addOrderQuery.mutate();
    router.push(`orders/${newOrder.numberOfOrder}/basic`);
  }

  function updateOrders() {
    queryClient.invalidateQueries({
      queryKey: ["allOrders"],
    });
  }

  useEffect(() => {
    console.log("update", isPendingOrders, isSynchronized);
    if (isPendingOrders) {
      setSync("Загрузка...");
      setSyncStyle(syncStyles.pending);
    } else if (isSynchronized) {
      setSync("Синхронизировано");
      setSyncStyle(syncStyles.sync);
    } else {
      setSync("Данные не синхронизированы");
      setSyncStyle(syncStyles.noSync);
    }
  }, [isPendingOrders, isSynchronized]);

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
          click={updateOrders}
        >
          <Image
            src={Refresh}
            alt=""
            className={isPendingOrders ? classes.spin : ""}
          />
        </Button>
        <Button style={syncStyle} click={updateOrders}>
          {sync}
        </Button>
      </div>
      <Button click={addOrder}>Добавить замер</Button>
    </div>
  );
}
