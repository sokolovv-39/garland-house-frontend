import classes from "./ObjectVariant.module.scss";

export function ObjectVariant({ variant, onClick }: { variant: string, onClick: (variant: string) => void }) {
  return (
    <div className={classes.wrapper} onClick={() => onClick(variant)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M2.40039 7.99999H8.00039M8.00039 7.99999H13.6004M8.00039 7.99999V2.39999M8.00039 7.99999V13.6"
          stroke="#C59B68"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{variant}</span>
    </div>
  );
}
