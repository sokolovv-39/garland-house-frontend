"use client";

import { ErrorPage, IDBContext } from "@/fsd/shared";
import { MeasureControl } from "@/fsd/widgets";
import React, { useContext, useEffect, useState } from "react";

export default function MeasureLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    measure: string;
  };
}>) {
  const idb = useContext(IDBContext);
  const [progress, setProgress] = useState<
    "success" | "error" | "loading" | "not_found"
  >("loading");

  useEffect(() => {
    idb?.orders
      .get(Number(params.measure))
      .then((order) => {
        if (order) setProgress("success");
        else setProgress("not_found");
      })
      .catch(() => setProgress("error"));
  }, []);

  return (
    <>
      {progress === "success" && (
        <div>
          <MeasureControl orderId={params.measure} />
          {children}
        </div>
      )}
      {progress === "loading" && <></>}
      {progress === "not_found" && <ErrorPage text="Такой заказ не найден" />}
      {progress === "error" && <ErrorPage text="Ошибка получения данных" />}
    </>
  );
}
