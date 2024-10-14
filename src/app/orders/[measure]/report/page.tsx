import { Report, Visualization } from "@/fsd/widgets";
import classes from "./page.module.scss";

export default function ReportPage() {
  return (
    <div className={classes.wrapper}>
      <Visualization />
      <Report />
    </div>
  );
}
