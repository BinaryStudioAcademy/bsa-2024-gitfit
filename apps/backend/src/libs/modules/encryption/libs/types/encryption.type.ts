import { type EncryptResult } from "./encrypt-result.type.js";

type Encryption = {
	compare: (data: string, hash: string) => Promise<boolean>;
	encrypt: (data: string) => Promise<EncryptResult>;
};

export { type Encryption };
