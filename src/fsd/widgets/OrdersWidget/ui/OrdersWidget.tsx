'use client'

import { OrdersTableControl } from "@/fsd/entities";
import { OrdersTable } from "@/fsd/entities";
import classes from "./OrdersWidget.module.scss";
import { useState } from "react";

export function OrdersWidget() {
  const [search, setSearch] = useState('')

  return (
    <div className={classes.wrapper}>
      <div className={classes.controlWrapper}>
        <OrdersTableControl searchCallback={(val) => setSearch(val)}/>
      </div>
      <OrdersTable searchVal={search} />
    </div>
  );
}
