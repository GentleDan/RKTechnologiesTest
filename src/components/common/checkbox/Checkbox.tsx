import { ChangeEvent, RefObject } from "react";
import styles from "./Checkbox.module.css";

type CheckboxProps = {
  label: string;
  ref?: RefObject<HTMLInputElement | null>;
  defaultChecked: boolean;
  onChange: (enabled: boolean) => void;
};

function Checkbox(props: CheckboxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked);
  };

  return (
    <label className={styles.checkboxContainer}>
      <input ref={props.ref} type="checkbox" onChange={handleChange} defaultChecked={props.defaultChecked} />
      {props.label}
    </label>
  );
}

export default Checkbox;
