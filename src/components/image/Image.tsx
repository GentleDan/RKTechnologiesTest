type ImageProps = {
	source: string | null;
};

function Image(props: ImageProps) {
	return (
		<>{props.source ? <img src={props.source} alt={"Cat image"} /> : <span> There's nothing to show right now</span>}</>
	);
}

export default Image;
