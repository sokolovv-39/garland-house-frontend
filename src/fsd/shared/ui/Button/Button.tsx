"use client";

import { ButtonHTMLAttributes, CSSProperties } from "react";
import { useRouter } from "nextjs-toploader/app";

export function Button({
  type = "submit",
  children,
  style,
  click,
  goto,
  mode = "basic",
}: {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: React.ReactNode;
  style?: CSSProperties;
  click?: () => void;
  goto?: string;
  mode?: "basic" | "noBackground" | "beige" | "red";
}) {
  const router = useRouter();

  function onClick() {
    if (goto) {
      router.push(goto);
    }
    if (click) {
      click();
    }
  }

  const defaultStyle: CSSProperties = {
    border: "none",
    background: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const basicStyle: CSSProperties = {
    ...defaultStyle,
    fontWeight: "600",
    color: "white",
    lineHeight: "normal",
    borderRadius: "16px",
    background: "#c59b68",
    padding: "12px 18px",
    ...style,
  };

  const noBackgroundStyle: CSSProperties = {
    ...defaultStyle,
    color: "#C59B68",
    fontWeight: "700",
    lineHeight: "100%" /* 16px */,
    ...style,
  };

  const beigeStyle: CSSProperties = {
    ...defaultStyle,
    borderRadius: "10px",
    background: "rgba(197, 155, 104, 0.06)",
    color: "#C59B68",
    fontWeight: "600",
    lineHeight: "16px" /* 100% */,
    letterSpacing: "-0.16px",
    padding: "12px 16px",
    ...style,
  };

  const redStyle: CSSProperties = {
    ...defaultStyle,
    color: "#F12F2F",
    fontWeight: "600",
    lineHeight: "16px" /* 100% */,
    letterSpacing: "-0.16px",
    borderRadius: "10px",
    background: "rgba(241, 47, 47, 0.05)",
    padding: "12px 16px",
    ...style,
  };

  let btnStyle: CSSProperties = {};

  switch (mode) {
    case "basic":
      btnStyle = basicStyle;
      break;
    case "noBackground":
      btnStyle = noBackgroundStyle;
      break;
    case "beige":
      btnStyle = beigeStyle;
      break;
    case "red":
      btnStyle = redStyle;
      break;
    default:
      break;
  }

  return (
    <button type={type} style={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
}
