"use client";

import classes from "./Comments.module.scss";
import { useState } from "react";

export function Comments() {
  const [message, setMessage] = useState("");

  return (
    <div className={classes.wrapper}>
      <h3>Комментарии</h3>
      <div className={classes.comments}>
        <span className={classes.empty}>Здесь пока что тихо</span>
      </div>
      <div className={classes.textareaWrapper}>
        <textarea
          placeholder="Написать комментарий"
          onChange={(e) => setMessage(e.currentTarget.value)}
        ></textarea>
        <div
          className={`${classes.sendSVGWrapper} ${
            message !== "" ? classes.send : ""
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity={message !== "" ? "1" : "0.5"}>
              <path
                d="M6.16641 5.26667L13.2414 2.90834C16.4164 1.85001 18.1414 3.58334 17.0914 6.75834L14.7331 13.8333C13.1497 18.5917 10.5497 18.5917 8.96641 13.8333L8.26641 11.7333L6.16641 11.0333C1.40807 9.45001 1.40807 6.85834 6.16641 5.26667Z"
                stroke={message !== "" ? "white" : "#191919"}
                strokeOpacity={message !== "" ? "1" : "0.76"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.4248 11.375L11.4081 8.38336"
                stroke={message !== "" ? "white" : "#191919"}
                strokeOpacity={message !== "" ? "1" : "0.76"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
