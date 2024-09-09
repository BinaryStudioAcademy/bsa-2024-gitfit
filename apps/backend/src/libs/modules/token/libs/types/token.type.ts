import { type JWTPayload } from "jose";

type Token = {
	createToken: (
		payload: JWTPayload,
		hasExpirationTime?: boolean,
	) => Promise<string>;
	verifyToken: (token: string) => Promise<JWTPayload>;
};

export { type Token };
