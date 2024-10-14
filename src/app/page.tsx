import { Logo } from "@/fsd/shared";
import classes from "./page.module.scss";
import { SignIn } from "@/fsd/widgets";

export default function Home() {
  return (
    <div className={classes.wrapper}>
      <Logo />
      <SignIn />
    </div>
  );
}
