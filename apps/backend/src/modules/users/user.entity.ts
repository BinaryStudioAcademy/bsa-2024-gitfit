import { type Entity } from "~/libs/types/types.js";

import { type UserSignUpResponseDto } from "./libs/types/types.js";

class UserEntity implements Entity {
	private email: string;

	private id: null | number;

	private name: string;

	private passwordHash: string;

	private passwordSalt: string;

	private constructor({
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
	}

	public static initialize({
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		id: number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			email,
			id,
			name,
			passwordHash,
			passwordSalt,
		});
	}

	public static initializeNew({
		email,
		name,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			email,
			id: null,
			name,
			passwordHash,
			passwordSalt,
		});
	}

	public toNewObject(): {
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			email: this.email,
			name: this.name,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toObject(): UserSignUpResponseDto {
		return {
			user: {
				email: this.email,
				id: this.id as number,
				name: this.name,
			},
		};
	}
}

export { UserEntity };
