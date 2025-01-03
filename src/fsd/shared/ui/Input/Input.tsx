"use client";

import { CSSProperties, useEffect, useState } from "react";
import classes from "./Input.module.scss";
import Image from "next/image";
import Search from "./images/search.svg";
import { splitPrice } from "../../lib";

export function Input({
  type,
  placeholder,
  searchStyle,
  onChange,
  initialValue,
  customInputStyles = {},
  placeholderClass,
  onKeyDown,
  isPrice = false,
  littleType = false,
  isLink = false,
  wrapperStyles,
  name,
  onFocus,
}: {
  type: "text" | "password" | "search";
  placeholder?: string;
  searchStyle?: CSSProperties;
  onChange?: (text: string) => void;
  initialValue?: string;
  customInputStyles?: CSSProperties;
  placeholderClass?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isPrice?: boolean;
  littleType?: boolean;
  isLink?: boolean;
  wrapperStyles?: CSSProperties;
    name?: string;
  onFocus?: () => void
}) {
  const [val, setVal] = useState<string>("");

  let inputStyles: CSSProperties = {};

  switch (type) {
    case "search":
      inputStyles = {
        padding: "10px 16px 10px 52px",
        width: "100%",
        ...customInputStyles,
      };
      break;
    case "text":
      inputStyles = {
        padding: "18px 16px",
        width: "100%",
        ...customInputStyles,
      };
    case "password":
      inputStyles = {
        width: "100%",
        padding: "18px 16px",
        ...customInputStyles,
      };
      break;
    default:
      break;
  }

  function inputClick(e: React.MouseEvent<HTMLInputElement>) {
    if (isLink) {
      const input = e.currentTarget;
      const val = e.currentTarget.value;
      const textWidth = getTextWidth(val, window.getComputedStyle(input).font);
      const clickX = e.clientX - input.getBoundingClientRect().left;
      if (clickX <= textWidth) {
        window.open(val, "_blank");
      } else {
        input.focus();
      }
    }
  }

  function getTextWidth(text: string, font: string) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = font;
      return context.measureText(text).width;
    }
    return 0;
  }

  useEffect(() => {
    if (initialValue) setVal(initialValue);
    else setVal("");
  }, [initialValue]);

  const inputElement = (
    <div className={classes.inputWrapper} style={wrapperStyles}>
      <span className={classes.littleType}>
        {littleType && val ? placeholder : ""}
      </span>
      <input
        onFocus={onFocus}
        name={name}
        value={
          isPrice
            ? val
              ? splitPrice(parseInt(val.replace(/\s/g, "")))
              : ""
            : val
        }
        onChange={(e) => {
          if (onChange) {
            let newVal = e.currentTarget.value;
            if (isPrice) {
              if (newVal.length !== 1) {
                if (newVal.indexOf("₽") > -1) {
                  newVal =
                    newVal.slice(0, -2) +
                    newVal[newVal.length - 1] +
                    newVal[newVal.length - 2];
                } else {
                  newVal = newVal.slice(0, -2);
                }
              }
            }
            onChange(newVal);
          }
        }}
        type={type}
        className={
          type === "search"
            ? `${classes.searchInput} ${classes.input} ${placeholderClass}`
            : `${classes.input} ${placeholderClass} ${
                isLink && classes.linkedInput
              }`
        }
        placeholder={placeholder}
        style={{
          ...inputStyles,
          paddingTop:
            littleType && val ? "23px" : type === "search" ? "10px" : "18px",
        }}
        onKeyDown={(e) => {
          if (onKeyDown) onKeyDown(e);
        }}
        onClick={inputClick}
      />
    </div>
  );

  return (
    <>
      {type === "search" ? (
        <div className={classes.search} style={searchStyle}>
          <Image src={Search} alt="" className={classes.image} /> {inputElement}
        </div>
      ) : (
        inputElement
      )}
    </>
  );
}
