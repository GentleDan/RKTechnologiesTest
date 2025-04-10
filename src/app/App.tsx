import { useImageFetcher } from "../shared/hooks/useImageFetch.ts";
import { useRef, useState } from "react";
import Checkbox from "../components/common/checkbox/Checkbox.tsx";
import Button from "../components/common/button/Button.tsx";
import ImageViewer from "../components/common/imageViewer/ImageViewer.tsx";
import styles from "./App.module.css";

function App() {
	const [isPanelEnabled, setIsPanelEnabled] = useState(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { imageSource, fetchImage, resetImageSource, enableAutoFetch, disableAutoFetch } = useImageFetcher();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const autoFetchCheckboxRef = useRef<HTMLInputElement>(null);

	const handleEnableCheckboxChange = (enabled: boolean) => {
		buttonRef.current!.disabled = !enabled;
		autoFetchCheckboxRef.current!.disabled = !enabled;
		setIsPanelEnabled(enabled);

		if (enabled) {
			return;
		}

		autoFetchCheckboxRef.current!.checked = false;
		handleAutoFetchCheckboxChange(false);
		resetImageSource();
	};

	const handleAutoFetchCheckboxChange = (enabled: boolean) => {
		if (!enabled) {
			disableAutoFetch();
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		enableAutoFetch();
	};

	const handleButtonClick = async () => {
		setIsLoading(true);
		await fetchImage();
		setIsLoading(false);
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.panelContainer}>
				<Checkbox label={"Enabled"} onChange={handleEnableCheckboxChange} defaultChecked={true} />
				<Checkbox
					ref={autoFetchCheckboxRef}
					label={"Auto-refresh every 5 seconds"}
					onChange={handleAutoFetchCheckboxChange}
					defaultChecked={false}
				/>
				<Button
					ref={buttonRef}
					label={"Get cat"}
					onClick={handleButtonClick}
					isLoading={isLoading}
					isDisabled={!isPanelEnabled}
				/>
			</div>
			<ImageViewer source={imageSource} />
		</div>
	);
}

export default App;
