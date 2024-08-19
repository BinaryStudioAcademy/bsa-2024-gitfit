import { type UserAuthResponseDto } from "./user-auth-response-dto.type.js";

type UserSignUpResponseDto = {
	token: string;
	user: UserAuthResponseDto;
};

export { type UserSignUpResponseDto };
