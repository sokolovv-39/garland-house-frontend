export type ApiLoginType = {
  accessToken: string;
  refreshToken: string;
};

export type ApiUserType = {
  id: number;
  fio: string;
  email: string;
  role: string;
};

export type ApiOrderType = {
  status: OrderStatusEnum;
  customerFIO: string;
  customerPhone: string;
  address: string;
  linkToYandexMap: string;
  linkToYandexDisk: string;
  contractNumber: string;
  linkToAmoCRM: string;
  measurementDate: string;
  paymentMethodForMeasurement: PaymentEnum;
  priceForMeasurement: number;
  measurementComment: string;
  budget: number;
  managerId: number;
  executorId: number;
  versions: Array<VersionType>;
};

type VersionType = {
  objects: Array<ObjectType>;
};

type ObjectType = {
  name: string;
  garlands: Array<GarlandType>;
};

type GarlandType = {
  a: number;
};

enum OrderStatusEnum {
  Assigned = "Assigned",
  Sign = "Sign",
  Conducted = "Conducted",
  Canceled = "Canceled",
}
enum PaymentEnum {
  Office = "Office",
  CLient = "CLient",
  NoData = "NoData",
}
