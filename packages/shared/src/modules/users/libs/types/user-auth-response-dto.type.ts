import { type UserInfoResponseDto } from "./user-info-response-dto.type.js";

type UserAuthResponseDto = {
	createdAt: string;
	id: number;
} & UserInfoResponseDto;

export { type UserAuthResponseDto };
