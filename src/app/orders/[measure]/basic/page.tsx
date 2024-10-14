import { OrderBasicInfo } from "@/fsd/entities";

export default function Measure({
  params,
}: {
  params: {
    measure: string;
  };
}) {
  return <OrderBasicInfo orderId={Number(params.measure)} />;
}
