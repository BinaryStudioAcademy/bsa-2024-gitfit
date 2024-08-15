import { type ServerErrorType } from "../../libs/enums/enums.js";
import { type ServerErrorDetail } from "./server-error-detail.type.js";

type ServerValidationErrorResponse = {
	details: ServerErrorDetail[];
	errorType: typeof ServerErrorType.VALIDATION;
	message: string;
};

type ServerCommonErrorResponse = {
	errorType: typeof ServerErrorType.COMMON;
	message: string;
};

type ServerErrorResponse =
	| ServerCommonErrorResponse
	| ServerValidationErrorResponse;

export {
	type ServerCommonErrorResponse,
	type ServerErrorResponse,
	type ServerValidationErrorResponse,
};
