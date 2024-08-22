import { type JWTPayload } from "jose";

type Token = {
	createToken: (payload: JWTPayload) => Promise<string>;
	decodeToken: (token: string) => JWTPayload;
	verifyToken: (token: string) => Promise<JWTPayload>;
};

export { type Token };
