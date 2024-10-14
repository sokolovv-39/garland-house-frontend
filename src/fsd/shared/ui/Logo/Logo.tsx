import classes from "./Logo.module.scss";
import localFont from "next/font/local";

const bebas_neue_bold = localFont({
  src: "./bebas-neue-bold.ttf",
  display: "swap",
});

export function Logo() {
  return (
    <p className={`${bebas_neue_bold.className} ${classes.title}`}>
      ДОМ <span>ГИРЛЯНД</span>
    </p>
  );
}
