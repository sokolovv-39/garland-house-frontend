import { Logo } from "@/fsd/shared";
import classes from "./Header.module.scss";
import { PageTabs, Profile } from "@/fsd/features";

export function Header() {
  return (
    <header className={classes.wrapper}>
      <Logo />
      <PageTabs />
      <Profile />
    </header>
  );
}
