import { type Entity } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "./libs/types/types.js";

class UserEntity implements Entity {
	private createdAt: null | string;

	private deletedAt: null | string;

	private email: string;

	private id: null | number;

	private name: string;

	private passwordHash: string;

	private passwordSalt: string;

	private constructor({
		createdAt,
		deletedAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
	}: {
		createdAt: null | string;
		deletedAt: null | string;
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
		this.createdAt = createdAt;
		this.deletedAt = deletedAt;
	}

	public static initialize({
		createdAt,
		deletedAt,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
	}: {
		createdAt: string;
		deletedAt: null | string;
		email: string;
		id: number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			createdAt,
			deletedAt,
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
			createdAt: null,
			deletedAt: null,
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

	public toObject(): UserAuthResponseDto {
		return {
			createdAt: this.createdAt as string,
			email: this.email,
			id: this.id as number,
			name: this.name,
		};
	}
}

export { UserEntity };
