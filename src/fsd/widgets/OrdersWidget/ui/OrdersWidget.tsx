"use client";

import { OrdersTableControl } from "@/fsd/entities";
import { OrdersTable } from "@/fsd/entities";
import classes from "./OrdersWidget.module.scss";
import { useState } from "react";

export function OrdersWidget() {
  const [search, setSearch] = useState("");
  const [isSynchronized, setIsSynchronized] = useState(false);
  const [isPendingOrders, setIsPendingOrders] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.controlWrapper}>
        <OrdersTableControl
          isSynchronized={isSynchronized}
          searchCallback={(val) => setSearch(val)}
          searchVal={search}
          isPendingOrders={isPendingOrders}
        />
      </div>
      <OrdersTable
        searchVal={search}
        setIsSynchronized={setIsSynchronized}
        setIsPendingOrders={setIsPendingOrders}
      />
    </div>
  );
}
