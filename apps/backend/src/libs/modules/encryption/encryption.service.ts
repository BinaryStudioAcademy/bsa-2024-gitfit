import bcrypt from "bcrypt";

import { ApplicationError } from "~/libs/exceptions/exceptions.js";

import { EncryptionServiceMessage } from "./libs/enums/enums.js";

const DEFAULT_SALT_ROUNDS = 10;

class EncryptionService {
	private saltRounds: number;

	public constructor() {
		this.saltRounds = process.env["SALT_ROUNDS"]
			? Number.parseInt(process.env["SALT_ROUNDS"])
			: DEFAULT_SALT_ROUNDS;
	}

	public async comparePassword(
		password: string,
		hash: string,
	): Promise<boolean> {
		try {
			return await bcrypt.compare(password, hash);
		} catch (error) {
			throw new ApplicationError({
				cause: error,
				message: EncryptionServiceMessage.COMPARE_PASSWORD,
			});
		}
	}

	public async hashPassword(password: string): Promise<string> {
		try {
			return await bcrypt.hash(password, this.saltRounds);
		} catch (error) {
			throw new ApplicationError({
				cause: error,
				message: EncryptionServiceMessage.HASH_PASSWORD,
			});
		}
	}
}

export { EncryptionService };
