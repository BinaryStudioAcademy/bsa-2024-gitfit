import libraryDebounce from "debounce";

import { DEBOUNCE_TIMEOUT } from "./libs/constants.js";

type FunctionWithArguments<T> = (...arguments_: T[]) => void;

const debounce = <T>(
	callback: FunctionWithArguments<T>,
	timeout: number = DEBOUNCE_TIMEOUT,
): ReturnType<typeof libraryDebounce> => {
	return libraryDebounce(callback, timeout);
};

export { debounce };
