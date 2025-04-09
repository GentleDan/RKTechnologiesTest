import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../lib/axios.ts";

export type RequestResponse = {
	success: boolean;
	errorMessage?: string;
	source?: string;
};

export const imageRequest = async (): Promise<RequestResponse> => {
	try {
		const url: string = import.meta.env.VITE_SOURCE_IMAGE_URL;
		const response: AxiosResponse = await axiosInstance.get(url);

		return { success: true, source: response.data[0].url };
	} catch (error) {
		if (error instanceof AxiosError) {
			return { success: false, errorMessage: error.message };
		}

		return { success: false, errorMessage: "Something went wrong" };
	}
};
