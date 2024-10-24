"use client";

import { CSSProperties, MouseEventHandler, useEffect, useState } from "react";
import classes from "./NumberSelect.module.scss";

export function NumberSelect({
  type,
  initialValue,
  callback,
  minValue = 0,
  style,
}: {
  type: string;
  initialValue: number;
  callback: (val: number) => void;
  minValue?: number;
  style?: {
    height?: CSSProperties["height"];
    operandWidth?: CSSProperties["width"];
    littleTypeTop?: CSSProperties["top"];
    inputWidth?: CSSProperties["width"];
    gap?: CSSProperties["gap"];
  };
}) {
  const [number, setNumber] = useState<number | "">(
    initialValue ? initialValue : ""
  );
  if (type === "Длина, м") {
  }

  useEffect(() => {
    if (initialValue) setNumber(initialValue);
    else setNumber("");
  }, [initialValue]);

  return (
    <div
      className={classes.wrapper}
      style={{
        height: style?.height,
        gap: style?.gap,
      }}
    >
      <div
        style={{
          minWidth: style?.operandWidth,
          width: style?.operandWidth,
          maxWidth: style?.operandWidth,
        }}
        className={classes.operand}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          if (number !== "" && number > minValue) {
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
            if (number > minValue) {
              setNumber("");
              callback(0);
            }
          } else if (number !== "") {
            const newVal = number - 1;
            if (newVal >= minValue) {
              callback(newVal);
              setNumber(newVal);
            }
          }
        }}
      >
        -
      </div>
      {number && (
        <span
          className={classes.type}
          style={{
            top: style?.littleTypeTop,
          }}
        >
          {type}
        </span>
      )}
      <input
        type="text"
        className={classes.number}
        placeholder={type}
        onBlur={(e) => {
          const value = e.currentTarget.value;
          if (value !== "" && +value < minValue) {
            setNumber(minValue);
            callback(minValue);
          } else if (value === "") {
            setNumber("");
            callback(minValue);
          }
        }}
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
        style={{
          paddingTop: number && "13px",
          minWidth: style?.inputWidth,
        }}
      />
      <div
        style={{
          minWidth: style?.operandWidth,
          width: style?.operandWidth,
          maxWidth: style?.operandWidth,
        }}
        className={classes.operand}
        onClick={() => {
          if (number === "") {
            const newVal = 1;
            setNumber(newVal);
            callback(newVal);
          } else {
            const newVal = number + 1;
            setNumber(newVal);
            callback(newVal);
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
