import { type JWTPayload, jwtVerify, SignJWT } from "jose";

import { type Token } from "./libs/types/types.js";

type Constructor = {
	algorithm: string;
	expirationTime: string;
	secret: string;
};

class BaseToken implements Token {
	private algorithm: string;
	private expirationTime: string;
	private secret: Uint8Array;

	public constructor({ algorithm, expirationTime, secret }: Constructor) {
		this.secret = new TextEncoder().encode(secret);
		this.expirationTime = expirationTime;
		this.algorithm = algorithm;
	}

	public async createToken(
		payload: JWTPayload,
		hasExpirationTime: boolean = true,
	): Promise<string> {
		const jwt = new SignJWT(payload)
			.setProtectedHeader({ alg: this.algorithm })
			.setIssuedAt();

		if (hasExpirationTime) {
			jwt.setExpirationTime(this.expirationTime);
		}

		return await jwt.sign(this.secret);
	}

	public async verifyToken(token: string): Promise<JWTPayload> {
		const { payload } = await jwtVerify(token, this.secret);

		return payload;
	}
}

export { BaseToken };
