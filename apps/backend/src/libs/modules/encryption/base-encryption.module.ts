import bcrypt from "bcrypt";

import { type Encryption, type EncryptionResult } from "./libs/types/types.js";

class BaseEncryption implements Encryption {
	private saltRounds: number;

	public constructor(saltRounds: number) {
		this.saltRounds = saltRounds;
	}

	public async compare(data: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(data, hash);
	}

	public async encrypt(data: string): Promise<EncryptionResult> {
		const salt = await bcrypt.genSalt(this.saltRounds);
		const encryptedData = await bcrypt.hash(data, salt);

		return { encryptedData, salt };
	}
}

export { BaseEncryption };
