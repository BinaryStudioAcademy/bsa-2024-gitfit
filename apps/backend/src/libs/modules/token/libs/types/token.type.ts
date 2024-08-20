import { type JWTPayload } from "jose";

type CreateTokenFunction = (payload: JWTPayload) => Promise<string>;

type VerifyFunction = (token: string) => Promise<JWTPayload>;

type Token = {
	createToken: CreateTokenFunction;
	verifyToken: VerifyFunction;
};

export { type Token };
