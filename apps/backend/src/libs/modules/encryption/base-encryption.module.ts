import bcrypt from "bcrypt";
import crypto from "node:crypto";

import { type Config } from "../config/config.js";
import { type Encryption, type HashResult } from "./libs/types/types.js";

const INPUT_ENCODING = "utf8";
const OUTPUT_ENCODING = "base64";
const INITIAL_VECTOR = "iv";

class BaseEncryption implements Encryption {
	private algorithm: string;

	private saltRounds: number;

	private secret: string;

	public constructor(config: Config) {
		this.saltRounds = config.ENV.ENCRYPTION.SALT_ROUNDS;
		this.algorithm = config.ENV.ENCRYPTION.ALGORITHM;
		this.secret = config.ENV.ENCRYPTION.SECRET;
	}

	public async compare(data: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(data, hash);
	}

	public decrypt(encryptedData: string): string {
		const decipher = crypto.createDecipheriv(
			this.algorithm,
			this.secret,
			INITIAL_VECTOR,
		);

		return decipher.update(encryptedData, OUTPUT_ENCODING, INPUT_ENCODING);
	}

	public encrypt(data: string): string {
		const chipher = crypto.createCipheriv(
			this.algorithm,
			this.secret,
			INITIAL_VECTOR,
		);

		return (
			chipher.update(JSON.stringify(data), INPUT_ENCODING, OUTPUT_ENCODING) +
			chipher.final(OUTPUT_ENCODING)
		);
	}

	public async hash(data: string): Promise<HashResult> {
		const salt = await bcrypt.genSalt(this.saltRounds);
		const hashedData = await bcrypt.hash(data, salt);

		return { hashedData, salt };
	}
}

export { BaseEncryption };
