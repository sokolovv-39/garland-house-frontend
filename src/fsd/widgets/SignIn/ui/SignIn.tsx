"use client";

import { api, Button, IDBContext, Input, userStore } from "@/fsd/shared";
import classes from "./SignIn.module.scss";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { observer } from "mobx-react-lite";

type ResponseType = {
  accessToken: string;
  refreshToken: string;
};

function SignInComp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (form: HTMLFormElement) => {
      const formData = new FormData(form);
      const formObj = Object.fromEntries(formData.entries());
      const res = await api.post("/auth/login", formObj);
      const data = (await res.data) as ResponseType;
      return data;
    },
    onSuccess: async (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      router.push("/orders");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Вход</h1>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(e.currentTarget);
        }}
      >
        <Input
          onFocus={() => mutation.reset()}
          name="email"
          type="text"
          placeholder="Логин"
          onChange={(val) => setLogin(val)}
          initialValue={login}
        />
        <Input
          onFocus={() => mutation.reset()}
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={(val) => setPassword(val)}
          initialValue={password}
        />
        {mutation.isError && (
          <p className={classes.wrong}>Неправильный логин и/или пароль</p>
        )}
        <Button
          style={{
            padding: "19px 0",
            marginTop: "16px",
          }}
        >
          Войти
        </Button>
      </form>
    </div>
  );
}

export const SignIn = observer(SignInComp);
