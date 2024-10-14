import { Button, Input } from "@/fsd/shared";
import classes from "./SignIn.module.scss";

export function SignIn() {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Вход</h1>
      <form className={classes.form}>
        <Input type="text" placeholder="Логин" />
        <Input type="password" placeholder="Пароль" />
        <Button
          style={{
            padding: "19px 0",
            marginTop: "16px",
          }}
          goto="/orders"
          type="button"
        >
          Войти
        </Button>
      </form>
    </div>
  );
}
