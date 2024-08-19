import { jwtVerify, SignJWT } from "jose";
import { type JWTPayload, type KeyLike } from "jose";

class TokenService {
	private secret: KeyLike;

	public constructor(secret: KeyLike) {
		this.secret = secret;
	}

	public async createToken(userId: string): Promise<string> {
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
