import { type UserAuthResponseDto } from "@git-fit/shared";
import { type JWTPayload } from "jose";

function isUserAuthResponseDto(object: unknown): object is UserAuthResponseDto {
	return (
		typeof object === "object" &&
		object !== null &&
		"id" in object &&
		typeof object.id === "number" &&
		"email" in object &&
		typeof object.email === "string" &&
		"name" in object &&
		typeof object.name === "string"
	);
}

function extractUserFromToken(payload: JWTPayload): null | UserAuthResponseDto {
	if (isUserAuthResponseDto(payload)) {
		const { email, id, name } = payload;

		return { email, id, name };
	}

	return null;
}

export { extractUserFromToken };
