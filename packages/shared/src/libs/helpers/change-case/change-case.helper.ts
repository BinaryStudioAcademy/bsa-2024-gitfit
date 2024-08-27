import { caseTypeToFunction } from "./libs/maps/maps.js";
import { type CaseType } from "./types/types.js";

const changeCase = (input: string, caseType: CaseType): string => {
	const caseFunction = caseTypeToFunction[caseType];

	return caseFunction(input);
};

export { changeCase };
