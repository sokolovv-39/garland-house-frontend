"use client";

import { useRouter } from "nextjs-toploader/app";

export default function Measure() {
  const router = useRouter();
  router.push("/orders");

  return <></>;
}
