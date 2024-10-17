"use client";

import { useState } from "react";
import classes from "./Toggler.module.scss";

export function Toggler({
  type,
  isActive,
  callback,
}: {
  type: string;
  isActive: boolean;
  callback: (isActive: boolean) => void;
}) {
  const [isOn, setIsOn] = useState(isActive);

  return (
    <div className={classes.wrapper}>
      <p className={classes.type}>{type}</p>
      <div
        className={`${classes.outer} ${isOn && classes.outerOn}`}
        onClick={() => {
          setIsOn(!isOn);
          callback(!isOn);
        }}
      >
        <div className={`${classes.inner} ${isOn && classes.innerOn}`}></div>
      </div>
    </div>
  );
}
