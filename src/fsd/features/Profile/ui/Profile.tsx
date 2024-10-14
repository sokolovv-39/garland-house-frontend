import { Button, ProfileIcon } from "@/fsd/shared";
import classes from "./Profile.module.scss";

const name = "Игорь Соколов";

export function Profile() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.nameBtn}>
        <p className={classes.name}>{name}</p>
        <Button type="button" mode="noBackground" goto="/">
          Выйти
        </Button>
      </div>
      <ProfileIcon name={name} />
    </div>
  );
}
