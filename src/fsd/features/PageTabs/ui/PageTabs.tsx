import Link from "next/link";
import classes from "./PageTabs.module.scss";
import Gallery from "./images/Gallery.svg";
import Configurator from "./images/Configurator.svg";
import Orders from "./images/Orders.svg";
import Image from "next/image";

export function PageTabs() {
  return (
    <div className={classes.wrapper}>
      <Link href="/orders" className={`${classes.link} ${classes.active}`}>
        <Image src={Orders} alt="" />
        <span>Заказы</span>
      </Link>
      <Link href="/orders" className={classes.link}>
        <Image src={Configurator} alt="" />
        <span>Конфигуратор</span>
      </Link>
      <Link href="/orders" className={classes.link}>
        <Image src={Gallery} alt="" />
        <span>Галерея</span>
      </Link>
    </div>
  );
}
