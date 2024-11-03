import { Header } from "@/fsd/widgets/Header/ui/Header";
import React from "react";
import classes from "./layout.module.scss";
import { AuthGuard, IndexedDBProvider } from "@/fsd/shared";

export default function WithHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={classes.wrapper}>
      <IndexedDBProvider>
        <AuthGuard>
          <Header />
          <>{children}</>
        </AuthGuard>
      </IndexedDBProvider>
    </div>
  );
}
