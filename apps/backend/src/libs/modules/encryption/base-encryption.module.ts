import bcrypt from "bcrypt";
import crypto from "node:crypto";

import { type Config } from "../config/config.js";
import { type Encryption, type HashResult } from "./libs/types/types.js";

class BaseEncryption implements Encryption {
	private algorithm: string;

	private inputEncoding: crypto.Encoding;

	private outputEncoding: crypto.Encoding;

	private saltRounds: number;

	private secret: string;

	public constructor(config: Config) {
		this.saltRounds = config.ENV.ENCRYPTION.SALT_ROUNDS;
		this.algorithm = config.ENV.ENCRYPTION.ALGORITHM;
		this.secret = config.ENV.ENCRYPTION.SECRET;
		this.inputEncoding = "utf8";
		this.outputEncoding = "base64";
	}

	public async compare(data: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(data, hash);
	}

	public decrypt(encryptedData: string): string {
		const decipher = crypto.createDecipheriv(this.algorithm, this.secret, null);

		return (
			decipher.update(encryptedData, this.outputEncoding, this.inputEncoding) +
			decipher.final(this.inputEncoding)
		);
	}

	public encrypt(data: string): string {
		const chipher = crypto.createCipheriv(this.algorithm, this.secret, null);

		return (
			chipher.update(data, this.inputEncoding, this.outputEncoding) +
			chipher.final(this.outputEncoding)
		);
	}

	public async hash(data: string): Promise<HashResult> {
		const salt = await bcrypt.genSalt(this.saltRounds);
		const hashedData = await bcrypt.hash(data, salt);

		return { hashedData, salt };
	}
}

export { BaseEncryption };
