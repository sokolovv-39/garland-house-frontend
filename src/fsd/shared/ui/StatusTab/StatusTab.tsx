import { CSSProperties } from "react";
import classes from "./StatusTab.module.scss";
import { OrderStatusType } from "@/fsd/entities";

export function StatusTab({
  status,
  inactive = false,
  onClick,
  button = false,
}: {
  status: OrderStatusType;
  inactive?: boolean;
  onClick?: () => void;
  button?: boolean;
}) {
  let statusStyle: CSSProperties = {
    borderRadius: button ? "999px" : "8px",
    cursor: "pointer",
  };

  if (inactive) {
    statusStyle = {
      ...statusStyle,
      color: "#0E1117",
      border: "1px solid rgba(25, 25, 25, 0.04)",
      background: "white",
      opacity: "0.5",
    };
  } else {
    switch (status) {
      case "Назначен":
        statusStyle = {
          ...statusStyle,
          color: "#1E3899",
          border: "1px solid rgba(47, 89, 241, 0.12)",
          background: "rgba(47, 89, 241, 0.12)",
        };
        break;
      case "Отменен":
        statusStyle = {
          ...statusStyle,
          color: "color: #616161",
          border: "1px solid rgba(25, 25, 25, 0.04)",
          background: "rgba(25, 25, 25, 0.04)",
        };
        break;
      case "Подписан":
        statusStyle = {
          ...statusStyle,
          color: "#99541C",
          border: "1px solid rgba(242, 133, 44, 0.12)",
          background: "rgba(242, 133, 44, 0.12)",
        };
        break;
      case "Проведен":
        statusStyle = {
          ...statusStyle,
          color: "#801E99",
          border: "1px solid rgba(202, 47, 241, 0.12)",
          background: "rgba(202, 47, 241, 0.12)",
        };
        break;

      default:
        statusStyle = { ...statusStyle };
        break;
    }
  }

  return (
    <span
      className={classes.wrapper}
      style={statusStyle}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {status}
    </span>
  );
}
