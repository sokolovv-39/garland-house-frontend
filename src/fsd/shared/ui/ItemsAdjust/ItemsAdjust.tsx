"use client";

import { useState } from "react";
import { Button } from "../Button";
import classes from "./ItemsAdjust.module.scss";

export function ItemsAdjust({
  list,
  active,
  callback,
}: {
  list: string[];
  active: string;
  callback: (val: string) => void;
}) {
  const [currentActive, setCurrentActive] = useState(active);
  const flexBasisVal = (100 / list.length).toFixed(2);

  return (
    <div className={classes.wrapper}>
      {list.map((param, i) => (
        <Button
          key={i}
          style={{ flex: `0 0 ${flexBasisVal}%`, height: "40px" }}
          mode={currentActive === param ? "basic" : "beige"}
          click={() => {
            setCurrentActive(param);
            callback(param);
          }}
        >
          {param}
        </Button>
      ))}
    </div>
  );
}
