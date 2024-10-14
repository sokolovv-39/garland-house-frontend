import classes from "./PlusSVG.module.scss";

export function PlusSVG({ hovered = true, disabled = false }: { hovered?: boolean, disabled?:boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{
        opacity: `${hovered ? "1" : "0.5"}`,
        cursor: `${disabled ? 'auto' : 'pointer'}`
      }}
      className={classes.wrapper}
    >
      <path
        d="M2.40039 7.99999H8.00039M8.00039 7.99999H13.6004M8.00039 7.99999V2.39999M8.00039 7.99999V13.6"
        stroke="#C59B68"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
