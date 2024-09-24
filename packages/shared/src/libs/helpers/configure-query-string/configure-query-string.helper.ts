import { EMPTY_LENGTH } from "../../constants/constants.js";

const configureQueryString = <T extends Record<string, string>>(
	baseUrl: string,
	parameters: T[],
): string => {
	let queryString = baseUrl;

	if (parameters.length > EMPTY_LENGTH) {
		queryString += "?";
		queryString += parameters
			.map(
				(parameter) =>
					`${parameter["name"] as string}=${parameter["value"] as string}`,
			)
			.join("&");
	}

	return queryString;
};

export { configureQueryString };
