import bcrypt from "bcrypt";

// this part will be done by ticket #6
class Encryption {
	public async compare(data: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(data, hash);
	}
}

export { Encryption };
