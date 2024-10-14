"use client";

import { IndexedDB } from "@/fsd/features";
import { useEffect, useState } from "react";
import { IDBContext } from "../../lib";
import classes from "./IndexedDBProvider.module.scss";

export function IndexedDBProvider({ children }: { children: React.ReactNode }) {
  const [DBInit, setDBInit] = useState<
    "success" | "pending" | "error" | "deleting"
  >("pending");
  const [DB, setDB] = useState<IndexedDB | null>(null);
  const db = new IndexedDB();

  function clearDB() {
    setDBInit("deleting");
    db.idbDelete().catch((err) => {
      setDBInit("error");
      console.error(err);
    });
  }

  useEffect(() => {
    db.idbInit()
      .then(() => {
        setDB(db);
        setDBInit("success");
      })
      .catch((error) => {
        console.error(error);
        setDBInit("error");
      });
  }, []);

  return (
    <>
      {DBInit === "success" && (
        <>
          <IDBContext.Provider value={DB}>{children}</IDBContext.Provider>
          {process.env.NODE_ENV === "development" && (
            <button className={classes.wrapper} onClick={clearDB}>
              <h4>Очистить базу данных</h4>
              <span>dev</span>
            </button>
          )}
        </>
      )}
      {DBInit === "pending" && <p>Инициализация базы данных...</p>}
      {DBInit === "error" && <p>Ошибка доступа к базе данных :&#40;&#40;</p>}
      {DBInit === "deleting" && <p>Удаление базы данных...</p>}
    </>
  );
}
