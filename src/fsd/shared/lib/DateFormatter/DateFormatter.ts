import { MonthEnum } from "./types";

export class DateFormatter {
  date: Date;

  constructor(date: Date) {
    this.date = date;
  }

  dateToDayMonth() {
    return `${this.date.getDate()} ${
      MonthEnum[this.date.getMonth()]
    }`.toLocaleLowerCase();
  }
}
