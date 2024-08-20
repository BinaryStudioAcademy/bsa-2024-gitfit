import { type JWTPayload, jwtVerify, SignJWT } from "jose";

import { type Token } from "./token.js";

class TokenService implements Token {
	private algorithm: string;
	private expirationTime: string;
	private secret: Uint8Array;

	public constructor(
		secret: string,
		expirationTime: string,
		algorithm: string,
	) {
		this.secret = new TextEncoder().encode(secret);
		this.expirationTime = expirationTime;
		this.algorithm = algorithm;
	}

	public async createToken(payload: JWTPayload): Promise<string> {
		return await new SignJWT(payload)
			.setProtectedHeader({ alg: this.algorithm })
			.setIssuedAt()
			.setExpirationTime(this.expirationTime)
			.sign(this.secret);
	}

	public async verifyToken(token: string): Promise<JWTPayload> {
		const { payload } = await jwtVerify(token, this.secret);

		return payload;
	}
}

export { TokenService };
