"use client";

import { Button, Input } from "@/fsd/shared";
import classes from "./SignIn.module.scss";
import { useState } from "react";

export function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Вход</h1>
      <form className={classes.form}>
        <Input
          type="text"
          placeholder="Логин"
          onChange={(val) => setLogin(val)}
          initialValue={login}
        />
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(val) => setPassword(val)}
          initialValue={password}
        />
        <Button
          style={{
            padding: "19px 0",
            marginTop: "16px",
          }}
          goto="/orders"
          type="button"
        >
          Войти
        </Button>
      </form>
    </div>
  );
}
