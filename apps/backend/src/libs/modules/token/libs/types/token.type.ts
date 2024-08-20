import { type JWTPayload } from "jose";

type Token = {
	createToken: (payload: JWTPayload) => Promise<string>;
	verifyToken: (token: string) => Promise<JWTPayload>;
};

export { type Token };
