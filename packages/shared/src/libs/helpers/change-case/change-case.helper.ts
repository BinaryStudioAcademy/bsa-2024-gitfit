import { caseTypeToFunction } from "./libs/maps/maps.js";
import { type CaseType } from "./libs/types/types.js";

const changeCase = (
	input: Array<string> | string,
	caseType: CaseType,
): string => {
	const caseFunction = caseTypeToFunction[caseType];
	const parsedInput = Array.isArray(input) ? input.join(" ") : input;

	return caseFunction(parsedInput);
};

export { changeCase };
