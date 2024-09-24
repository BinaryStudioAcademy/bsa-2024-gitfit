import { EMPTY_LENGTH } from "../../constants/constants.js";

const configureQueryString = <T extends Record<string, string>>(
	baseUrl: string,
	parameters: T[],
): string => {
	const searchParameters = new URLSearchParams();

	if (parameters.length > EMPTY_LENGTH) {
		for (const parameter of parameters) {
			searchParameters.append(
				parameter["name"] as string,
				parameter["value"] as string,
			);
		}

		return `${baseUrl}?${searchParameters.toString()}`;
	}

	return baseUrl;
};

export { configureQueryString };
