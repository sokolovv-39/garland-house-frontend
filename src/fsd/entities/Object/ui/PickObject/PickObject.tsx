"use client";

import { Input, ObjectVariant } from "@/fsd/shared";
import classes from "./PickObject.module.scss";
import { useState } from "react";
import { defaultObjects } from "../../model";

export function PickObject({addObject}:{addObject: (object: string) => void}) {
  const [object, setObject] = useState<string>("");

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputWrapper}>
        <Input
          type="text"
          placeholder="Добавить объект"
          onChange={(text) => setObject(text)}
        />
        <div
          className={`${classes.plusSvgWrapper} ${
            object !== "" ? classes.activePlus : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.40039 7.99999H8.00039M8.00039 7.99999H13.6004M8.00039 7.99999V2.39999M8.00039 7.99999V13.6"
              stroke={object === "" ? "#191919" : "white"}
              strokeOpacity={object === "" ? "0.2" : "1"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={classes.variants}>
        {defaultObjects.map((obj, i) => (
          <ObjectVariant variant={obj} key={i} onClick={addObject}/>
        ))}
      </div>
    </div>
  );
}
