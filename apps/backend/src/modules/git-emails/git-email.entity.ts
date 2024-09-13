import { type Entity } from "~/libs/types/types.js";
import { type ContributorModel } from "~/modules//contributors/contributors.js";

import { type GitEmailGetAllItemResponseDto } from "./libs/types/types.js";

class GitEmailEntity implements Entity {
	private contributor!: Pick<ContributorModel, "id" | "name">;

	private email!: string;

	private id!: null | number;

	private constructor({
		contributor,
		email,
		id,
	}: {
		contributor: Pick<ContributorModel, "id" | "name">;
		email: string;
		id: null | number;
	}) {
		this.contributor = contributor;
		this.email = email;
		this.id = id;
	}

	public static initialize({
		contributor,
		email,
		id,
	}: {
		contributor: Pick<ContributorModel, "id" | "name">;
		email: string;
		id: number;
	}): GitEmailEntity {
		return new GitEmailEntity({
			contributor,
			email,
			id,
		});
	}

	public static initializeNew({
		contributor,
		email,
	}: {
		contributor: Pick<ContributorModel, "id" | "name">;
		email: string;
	}): GitEmailEntity {
		return new GitEmailEntity({
			contributor,
			email,
			id: null,
		});
	}

	public toNewObject(): {
		contributor: Pick<ContributorModel, "id" | "name">;
		email: string;
	} {
		return {
			contributor: this.contributor,
			email: this.email,
		};
	}

	public toObject(): GitEmailGetAllItemResponseDto {
		return {
			contributor: this.contributor,
			email: this.email,
			id: this.id as number,
		};
	}
}

export { GitEmailEntity };
