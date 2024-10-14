"use client";

import { PlusSVG } from "../PlusSVG";
import classes from "./Select.module.scss";
import { CSSProperties, useEffect, useState } from "react";

export function Select({
  type,
  values,
  style,
  variant = "arrow",
  callback,
  initialValue,
  saveType = false,
  littleType,
}: {
  type: string;
  values: string[];
  style?: CSSProperties;
  variant?: "arrow" | "plus";
  callback?: (val: string) => void;
  initialValue?: string;
  saveType?: boolean;
  littleType?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<string>();

  useEffect(() => {
    function handleClose(e: MouseEvent) {
      setIsOpen(false);
    }

    window.addEventListener("click", handleClose);

    return () => window.removeEventListener("click", handleClose);
  }, [isOpen]);

  const overviewClass =
    variant === "arrow" ? classes.arrowOverview : classes.plusOverview;

  useEffect(() => {
    if (initialValue) {
      setCheckedValue(initialValue);
    } else setCheckedValue(type);
  }, [initialValue]);

  return (
    <div
      className={classes.wrapper}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`${overviewClass} ${isOpen ? classes.overviewOpen : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {
          <div className={classes.type}>
            {littleType && <span className={classes.littleType}>{type}</span>}
            <span>{saveType ? type : checkedValue}</span>
          </div>
        }
        {variant === "arrow" && (
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7802 5.96667L9.43355 10.3133C8.92021 10.8267 8.08021 10.8267 7.56688 10.3133L3.22021 5.96667"
              stroke={isOpen ? "#C59B68" : "#191919"}
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {variant === "plus" && <PlusSVG hovered={hover} />}
      </div>
      {isOpen && (
        <ul className={classes.variants}>
          {values.map((val, i) => {
            if (val !== checkedValue || saveType) {
              return (
                <li
                  key={i}
                  onClick={() => {
                    setCheckedValue(val);
                    if (callback) {
                      callback(val);
                    }
                  }}
                >
                  {val}
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}
