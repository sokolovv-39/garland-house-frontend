import { makeAutoObservable } from "mobx";

type UserType = {
  id: number;
  fio: string;
  email: string;
  role: string;
};

const defaultUser: UserType = {
  id: 0,
  fio: "",
  email: "",
  role: "",
};

class UserStore {
  user: UserType = defaultUser;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: UserType) {
    this.user = user;
  }
}

export const userStore = new UserStore();
