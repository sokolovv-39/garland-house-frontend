"use client";

import { api, ApiLoginType, AuthGuard, Logo } from "@/fsd/shared";
import classes from "./page.module.scss";
import { SignIn } from "@/fsd/widgets";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await api.post("/auth/refreshtoken", refreshToken, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });
      return (await res.data) as ApiLoginType;
    },
    onSuccess: (data) => {
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/orders");
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <div className={classes.wrapper}>
      {mutation.isSuccess ||
        (mutation.isError && (
          <>
            <Logo />
            <SignIn />
          </>
        ))}
    </div>
  );
}
