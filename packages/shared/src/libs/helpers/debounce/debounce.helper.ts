import libraryDebounce from "debounce";

// import { DEBOUNCE_TIMEOUT } from "./libs/constants.js";

type FunctionWithArguments<T> = (...arguments_: T[]) => void;

const initDebounce = <T>(
	callback: FunctionWithArguments<T>,
	timeout: number,
): ReturnType<typeof libraryDebounce> => {
	return libraryDebounce(callback, timeout);
};

export { initDebounce };
