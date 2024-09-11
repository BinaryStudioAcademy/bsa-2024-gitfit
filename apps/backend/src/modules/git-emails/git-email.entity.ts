import { type Entity } from "~/libs/types/types.js";

import { type GitEmailGetAllItemResponseDto } from "./libs/types/types.js";

class GitEmailEntity implements Entity {
	private contributorId!: number;

	private email!: string;

	private id!: null | number;

	private constructor({
		contributorId,
		email,
		id,
	}: {
		contributorId: number;
		email: string;
		id: null | number;
	}) {
		this.contributorId = contributorId;
		this.email = email;
		this.id = id;
	}

	public static initialize({
		contributorId,
		email,
		id,
	}: {
		contributorId: number;
		email: string;
		id: number;
	}): GitEmailEntity {
		return new GitEmailEntity({
			contributorId,
			email,
			id,
		});
	}

	public static initializeNew({
		contributorId,
		email,
	}: {
		contributorId: number;
		email: string;
	}): GitEmailEntity {
		return new GitEmailEntity({
			contributorId,
			email,
			id: null,
		});
	}

	public toNewObject(): {
		contributorId: number;
		email: string;
	} {
		return {
			contributorId: this.contributorId,
			email: this.email,
		};
	}

	public toObject(): GitEmailGetAllItemResponseDto {
		return {
			contributorId: this.contributorId,
			email: this.email,
			id: this.id as number,
		};
	}
}

export { GitEmailEntity };
