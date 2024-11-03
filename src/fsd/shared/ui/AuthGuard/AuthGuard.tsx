"use client";

import { IDBContext, userStore } from "../../lib";
import { useRouter } from "nextjs-toploader/app";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, ApiLoginType, ApiUserType } from "../../api";
import { UserType } from "@/fsd/entities";

export function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const idb = useContext(IDBContext);
  const router = useRouter();
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/user");
      const data = await res.data;
      console.log("axios response", data);
      await idb?.user.setUser({
        dbID: 0,
        ...data[0],
      });
      return (await res.data) as ApiUserType;
    },
  });
  const mutation = useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("old", refreshToken);
      const res = await api.post("auth/refreshtoken", refreshToken, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      });
      return (await res.data) as ApiLoginType;
    },
    onError: () => {
      router.push("/");
    },
    onSuccess: (data) => {
      console.log("new", data.refreshToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      console.log("yes");
      console.log("mutation");
      mutation.mutate();
    } else {
      console.log("no");
      router.push("/");
    }
  }, []);

  return <>{mutation.isSuccess && <>{children}</>}</>;
}

/* function AuthGuardComp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export const AuthGuard = observer(AuthGuardComp); */
