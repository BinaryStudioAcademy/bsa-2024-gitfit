import { type UserResponseDto } from "./user-response-dto.type.js";

type UserSignUpResponseDto = {
	token: string;
	user: UserResponseDto;
};

export { type UserSignUpResponseDto };
