import { type EncryptionResult } from "./encryption-result.type.js";

type Encryption = {
	compare: (data: string, hash: string) => Promise<boolean>;
	encrypt: (data: string) => Promise<EncryptionResult>;
};

export { type Encryption };
