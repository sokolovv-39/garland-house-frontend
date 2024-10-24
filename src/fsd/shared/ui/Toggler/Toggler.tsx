"use client";

import { useState } from "react";
import classes from "./Toggler.module.scss";
import { Input } from "../Input";
import { NumberSelect } from "../NumberSelect";

export function Toggler({
  type,
  isActive,
  callback,
  val,
}: {
  type: string;
  isActive: boolean;
  callback: (isActive: boolean, val: number) => void;
  val: number;
}) {
  const [isOn, setIsOn] = useState(isActive);
  const [input, setInput] = useState(val);

  return (
    <div className={classes.wrapper}>
      <p className={classes.type}>{type}</p>
      {isOn && (
        <NumberSelect
          style={{
            operandWidth: "47px",
            height: "47px",
            littleTypeTop: "3px",
            inputWidth: "251px",
            gap: "6px",
          }}
          type="Длина покраски"
          initialValue={val}
          callback={(val) => {
            callback(isOn, val);
            setInput(val);
          }}
        />
      )}
      <div
        className={`${classes.outer} ${isOn && classes.outerOn}`}
        onClick={() => {
          setIsOn(!isOn);
          callback(!isOn, val);
        }}
      >
        <div className={`${classes.inner} ${isOn && classes.innerOn}`}></div>
      </div>
    </div>
  );
}
