import { useEffect, useRef, useState } from "react";
import Checkbox from "./components/checkbox/Checkbox.tsx";
import Button from "./components/button/Button.tsx";
import Image from "./components/image/Image.tsx";
import { imageRequest } from "./shared/api/requests.ts";
import "./App.css";

function App() {
	const [imageSource, setImageSource] = useState<string | null>(null);
	const intervalRef = useRef<number | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const autoFetchCheckboxRef = useRef<HTMLInputElement>(null);

	const handleEnableCheckboxChange = (enabled: boolean): void => {
		buttonRef.current!.disabled = !enabled;
		autoFetchCheckboxRef.current!.disabled = !enabled;

		if (enabled) {
			return;
		}

		autoFetchCheckboxRef.current!.checked = false;
		handleAutoFetchCheckboxChange(false);
		setImageSource(null);
	};

	const handleAutoFetchCheckboxChange = (enabled: boolean): void => {
		if (!enabled) {
			if (intervalRef.current === null) {
				return;
			}

			clearInterval(intervalRef.current);
			intervalRef.current = null;
			return;
		}

		intervalRef.current = setInterval(fetchImage, 5000);
	};

	const handleButtonClick = (): void => {
		fetchImage();
	};

	const fetchImage = async () => {
		try {
			const res = await imageRequest();

			if (!res.success) {
				console.error("Image fetch failed:", res.errorMessage);
				alert("Failed to fetch image");
				return;
			}

			setImageSource(res.source!);
		} catch (error) {
			console.error("Unexpected error", error);
		}
	};

	useEffect(() => {
		return () => {
			if (intervalRef.current !== null) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, []);

	return (
		<>
			<div className="main-container">
				<div className="buttons-container">
					<Checkbox label={"Enabled"} onChange={handleEnableCheckboxChange} defaultChecked={true} />
					<Checkbox
						ref={autoFetchCheckboxRef}
						label={"Auto-refresh every 5 seconds"}
						onChange={handleAutoFetchCheckboxChange}
						defaultChecked={false}
					/>
					<Button ref={buttonRef} label={"Get cat"} onClick={handleButtonClick} />
				</div>
				<div className="image-container">
					<Image source={imageSource} />
				</div>
			</div>
		</>
	);
}

export default App;
