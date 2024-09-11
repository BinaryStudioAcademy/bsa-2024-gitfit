import { type HashResult } from "./hash-result.type.js";

type Encryption = {
	compare: (data: string, hash: string) => Promise<boolean>;
	decrypt: (encryptedData: string) => string;
	encrypt: (data: string) => string;
	hash: (data: string) => Promise<HashResult>;
};

export { type Encryption };
