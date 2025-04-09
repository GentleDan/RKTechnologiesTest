import { RefObject } from "react";
import "./Button.module.css";

type ButtonProps = {
	label: string;
	ref: RefObject<HTMLButtonElement | null>;
	onClick?: () => void;
};

function Button(props: ButtonProps) {
	return (
		<button ref={props.ref} onClick={props.onClick}>
			{props.label}
		</button>
	);
}

export default Button;
