"use client";

import { useState } from "react";
import classes from "./ProfileIcon.module.scss";

export function ProfileIcon({ name }: { name: string }) {
  const splitted = name.split(" ");
  let firstLetters = "";
  if (splitted[0][0] && splitted[1][0])
    firstLetters = splitted[0][0] + splitted[1][0];

  return <div className={classes.wrapper}>{firstLetters}</div>;
}
