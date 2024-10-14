import classes from "./ProfileIcon.module.scss";

export function ProfileIcon({ name }: { name: string }) {
  const splitted = name.split(" ");
  const firstLetters = splitted[0][0] + splitted[1][0];

  return <div className={classes.wrapper}>{firstLetters}</div>;
}
