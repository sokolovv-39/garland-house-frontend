"use client";

import { MouseEventHandler, useState } from "react";
import classes from "./NumberSelect.module.scss";

export function NumberSelect({
  type,
  initialValue,
  callback,
}: {
  type: string;
  initialValue: number;
  callback: (val: number) => void;
}) {
  const [number, setNumber] = useState<number | "">(initialValue);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.operand}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          if (number !== "") {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.border = "1px solid rgba(25, 25, 25, 1)";
            e.currentTarget.style.cursor = "pointer";
          } else e.currentTarget.style.cursor = "default";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.opacity = "0.5";
          e.currentTarget.style.border = "1px solid rgba(25, 25, 25, 0.1)";
        }}
        onClick={() => {
          if (number === 1) {
            setNumber("");
            callback(0);
          } else if (number !== "") {
            const newVal = number - 1;
            callback(newVal);
            setNumber(newVal);
          }
        }}
      >
        -
      </div>
      <input
        type="text"
        className={classes.number}
        placeholder={type}
        onChange={(e) => {
          const value = e.currentTarget.value;
          if (value === "") {
            setNumber("");
            callback(0);
          } else {
            const toNumberVal = +value;
            if (toNumberVal) {
              setNumber(toNumberVal);
              callback(toNumberVal);
            }
          }
        }}
        value={number || ""}
      />
      <div
        className={classes.operand}
        onClick={() => {
          if (number === "") {
            const newVal = 1;
            setNumber(newVal);
            callback(newVal);
          } else {
            const newVal = number + 1
            setNumber(newVal)
            callback(newVal)
          }

        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.border = "1px solid rgba(25, 25, 25, 1)";
          e.currentTarget.style.cursor = "pointer";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.opacity = "0.5";
          e.currentTarget.style.border = "1px solid rgba(25, 25, 25, 0.1)";
        }}
      >
        +
      </div>
    </div>
  );
}
