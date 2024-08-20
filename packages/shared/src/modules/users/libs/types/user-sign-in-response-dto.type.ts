import { type UserAuthResponseDto } from "./user-auth-response-dto.type.js";

type UserSignInResponseDto = {
	token: string;
	user: UserAuthResponseDto;
};

export { type UserSignInResponseDto };
