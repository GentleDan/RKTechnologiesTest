import { useState, useRef, useEffect } from "react";
import { imageRequest } from "../api/requests";

export function useImageFetcher() {
	const [imageSource, setImageSource] = useState<string | null>(null);
	const intervalRef = useRef<number | null>(null);

	const fetchImage = async () => {
		try {
			const res = await imageRequest();
			if (res.success) setImageSource(res.source!);
			else alert("Failed to fetch image");
		} catch (err) {
			console.error("Unexpected error", err);
		}
	};

	const enableAutoFetch = () => {
		intervalRef.current = setInterval(fetchImage, 5000);
	};

	const disableAutoFetch = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const resetImageSource = () => {
		setImageSource(null);
	};

	useEffect(() => {
		return () => disableAutoFetch();
	}, []);

	return { imageSource, resetImageSource, fetchImage, enableAutoFetch, disableAutoFetch };
}
