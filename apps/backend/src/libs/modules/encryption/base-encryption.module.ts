import bcrypt from "bcrypt";

// this part will be taken from ticket #6
class BaseEncryption {
	public async compare(data: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(data, hash);
	}
}

export { BaseEncryption };
