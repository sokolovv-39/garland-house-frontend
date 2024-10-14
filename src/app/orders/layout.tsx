import { Header } from "@/fsd/widgets/Header/ui/Header";
import React from "react";
import classes from "./layout.module.scss";
import {IndexedDBProvider } from "@/fsd/shared";

export default function WithHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classes.wrapper}>
      <Header />
      <IndexedDBProvider>
        <>
          {children}
        </>
      </IndexedDBProvider>
    </div>
  );
}
