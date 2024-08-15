import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private email: string;

	private id: null | number;

	private passwordHash: string;

	private passwordSalt: string;

	private constructor({
		email,
		id,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		id: null | number;
		passwordHash: string;
		passwordSalt: string;
	}) {
		this.id = id;
		this.email = email;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
	}

	public static initialize({
		email,
		id,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		id: number;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			email,
			id,
			passwordHash,
			passwordSalt,
		});
	}

	public static initializeNew({
		email,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			email,
			id: null,
			passwordHash,
			passwordSalt,
		});
	}

	public toNewObject(): {
		email: string;
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			email: this.email,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toObject(): {
		email: string;
		id: number;
	} {
		return {
			email: this.email,
			id: this.id as number,
		};
	}
}

export { UserEntity };
