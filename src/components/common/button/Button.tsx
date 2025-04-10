import { RefObject } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  label: string;
  ref: RefObject<HTMLButtonElement | null>;
  isLoading: boolean;
  isDisabled: boolean;
  onClick?: () => void;
};

function Button(props: ButtonProps) {
  return (
    <button
      className={styles.button}
      ref={props.ref}
      onClick={props.onClick}
      disabled={props.isLoading || props.isDisabled}
    >
      {props.isLoading ? <div className={styles.loader} /> : props.label}
    </button>
  );
}

export default Button;
