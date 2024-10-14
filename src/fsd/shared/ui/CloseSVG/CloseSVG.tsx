import { CSSProperties } from "react";
import classes from "./CloseSVG.module.scss";

export function CloseSVG({
  width,
  height,
  style,
  photo = false,
  onClick,
}: {
  width?: string;
  height?: string;
  style?: CSSProperties;
  photo?: boolean;
  onClick?: () => void;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "28"}
      height={height ? height : "28"}
      viewBox="0 0 28 28"
      fill={photo ? "white" : "none"}
      className={classes.opacityWrapper}
      style={style}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <path
        d="M14.0007 25.6667C20.4173 25.6667 25.6673 20.4167 25.6673 14C25.6673 7.58334 20.4173 2.33334 14.0007 2.33334C7.58398 2.33334 2.33398 7.58334 2.33398 14C2.33398 20.4167 7.58398 25.6667 14.0007 25.6667Z"
        stroke={photo ? "white" : "#171717"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6992 17.3017L17.3026 10.6983"
        stroke="#171717"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.3026 17.3017L10.6992 10.6983"
        stroke="#171717"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
