type EncryptionResult = {
	encryptedData: string;
	salt: string;
};

type Encryption = {
	compare: (data: string, hash: string) => Promise<boolean>;
	encrypt: (data: string) => Promise<EncryptionResult>;
};

export { type Encryption, type EncryptionResult };
