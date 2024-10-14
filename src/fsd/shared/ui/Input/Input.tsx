"use client";

import { CSSProperties } from "react";
import classes from "./Input.module.scss";
import Image from "next/image";
import Search from "./images/search.svg";

export function Input({
  type,
  placeholder,
  searchStyle,
  onChange,
  initialValue,
}: {
  type: "text" | "password" | "search";
  placeholder?: string;
  searchStyle?: CSSProperties;
  onChange?: (text: string) => void;
  initialValue?: string;
}) {
  let inputStyles: CSSProperties = {};

  switch (type) {
    case "search":
      inputStyles = {
        padding: "10px 16px 10px 52px",
        width: "100%",
      };
      break;
    case "text":
      inputStyles = {
        padding: "18px 16px",
        width: "100%",
      };
    case "password":
      inputStyles = {
        width: "100%",
        padding: "18px 16px",
      };
      break;
    default:
      break;
  }

  const inputElement = (
    <input
      value={initialValue}
      onChange={(e) => {
        if (onChange) onChange(e.currentTarget.value);
      }}
      type={type}
      className={
        type === "search"
          ? `${classes.searchInput} ${classes.input}`
          : classes.input
      }
      placeholder={placeholder}
      style={inputStyles}
    />
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
