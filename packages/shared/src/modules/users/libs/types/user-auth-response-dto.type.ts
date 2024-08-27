import { type UserInfoResponseDto } from "./user-info-response-dto.type.js";

type UserAuthResponseDto = {
	id: number;
} & UserInfoResponseDto;

export { type UserAuthResponseDto };
