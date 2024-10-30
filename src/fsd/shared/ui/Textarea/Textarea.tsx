import { useState } from "react";
import classes from "./Textarea.module.scss";

export function Textarea({
  width,
  height,
  littleType,
}: {
  width: number;
  height: number;
  littleType?: string;
}) {
  const [val, setVal] = useState("");

  return (
    <div className={classes.wrapper}>
      {val && <span>{littleType}</span>}
      <textarea
        style={{
          paddingTop: val && "26px",
          width,
          height,
        }}
        className={classes.text}
        placeholder={littleType}
        onChange={(e) => setVal(e.currentTarget.value)}
      />
    </div>
  );
}
