import { camelCase, snakeCase } from "change-case";

import { type CaseType } from "../../types/types.js";

const caseTypeToFunction: Record<CaseType, (input: string) => string> = {
	camelCase,
	snakeCase,
};

export { caseTypeToFunction };
