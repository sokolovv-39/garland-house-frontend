"use client";

import { Button, IDBContext } from "@/fsd/shared";
import classes from "./MeasureControl.module.scss";
import ArrowLeft from "./images/arrow-left.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useRouter } from "nextjs-toploader/app";

export function MeasureControl({ orderId }: { orderId: string }) {
  const idb = useContext(IDBContext);
  const router = useRouter();
  const pathname = usePathname();
  const saveOrderQuery = useMutation({
    mutationFn: async () => {
      const order = await idb?.orders.get(orderId);
      return await new Promise((resolve) => resolve("data"));
    },
  });

  function saveOrder() {
    saveOrderQuery.mutate();
    router.push("/orders");
  }

  return (
    <div className={classes.wrapper}>
      <Link className={classes.order} href="/orders">
        <Image src={ArrowLeft} alt="" />
        <h2>Заказ №{orderId}</h2>
      </Link>
      <div className={classes.pages}>
        <Link
          href={`/orders/${orderId}/basic`}
          className={`${classes.link} ${
            pathname.includes("/basic") ? classes.activeLink : ""
          }`}
        >
          <span className={classes.number}>1</span>
          <span>Базовая информация</span>
        </Link>
        <Link
          href={`/orders/${orderId}/objects`}
          className={`${classes.link} ${
            pathname.includes("/objects") ? classes.activeLink : ""
          }`}
        >
          <span className={classes.number}>2</span>
          <span>Все объекты</span>
        </Link>
        <Link
          href={`/orders/${orderId}/report`}
          className={`${classes.link} ${
            pathname.includes("/report") ? classes.activeLink : ""
          }`}
        >
          <span className={classes.number}>3</span>
          <span>Отчет</span>
        </Link>
      </div>
      <Button click={saveOrder} type="button">
        Сохранить и закрыть
      </Button>
    </div>
  );
}
