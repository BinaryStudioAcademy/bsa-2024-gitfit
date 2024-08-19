import { type JWTPayload, jwtVerify, SignJWT } from "jose";

class TokenService {
	private expirationTime: string;
	private secret: Uint8Array;

	public constructor(secret: string, expirationTime: string) {
		this.secret = new TextEncoder().encode(secret);
		this.expirationTime = expirationTime;
	}

	public async createToken(userId: number): Promise<string> {
		return await new SignJWT({ userId })
			.setProtectedHeader({ alg: "HS256" })
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
