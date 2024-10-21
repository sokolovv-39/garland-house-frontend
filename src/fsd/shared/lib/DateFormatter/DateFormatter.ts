import { MonthEnum } from "./types";

export class DateFormatter {
  date?: Date;

  constructor(date?: Date) {
    if (date) this.date = date;
  }

  dateToDayMonth() {
    if (this.date) {
      return `${this.date.getDate()} ${
        MonthEnum[this.date.getMonth()]
      }`.toLocaleLowerCase();
    } else return "";
  }

  dateToDMY() {
    if (this.date) {
      const year = this.date.getFullYear();
      let month: number | string = this.date.getMonth() + 1;
      if (month < 10) month = "0" + month.toString();
      else month.toString();

      let day: number | string = this.date.getDate();
      if (day < 10) day = "0" + day.toString();
      else day.toString();

      return `${day}.${month}.${year}`;
    } else return "";
  }

  DMY_to_ms(dmy: string) {
    const date = new Date();
    const year = dmy.slice(6);
    const month = dmy.slice(3, 5);
    const day = dmy.slice(0, 2);

    date.setFullYear(parseInt(year));
    date.setMonth(parseInt(month) - 1);
    date.setDate(parseInt(day));

    return date.getTime();
  }
}
