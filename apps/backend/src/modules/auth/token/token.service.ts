import { type JWTPayload, jwtVerify, SignJWT } from "jose";

class TokenService {
	private secret: Uint8Array;

	public constructor(secret: string) {
		this.secret = new TextEncoder().encode(secret);
	}

	public async createToken(userId: number): Promise<string> {
		return await new SignJWT({ userId })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("24h")
			.sign(this.secret);
	}

	public async verifyToken(token: string): Promise<JWTPayload> {
		const { payload } = await jwtVerify(token, this.secret);

		return payload;
	}
}

export { TokenService };
