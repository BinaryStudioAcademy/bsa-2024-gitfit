import { type Entity } from "~/libs/types/types.js";
import { type ContributorModel } from "~/modules//contributors/contributors.js";

import { type GitEmailGetAllItemResponseDto } from "./libs/types/types.js";

class GitEmailEntity implements Entity {
	private contributor!: null | Pick<ContributorModel, "id" | "name">;

	private contributorId!: number;

	private email!: string;

	private id!: null | number;

	private constructor({
		contributor,
		contributorId,
		email,
		id,
	}: {
		contributor: null | Pick<ContributorModel, "id" | "name">;
		contributorId: number;
		email: string;
		id: null | number;
	}) {
		this.contributor = contributor;
		this.contributorId = contributorId;
		this.email = email;
		this.id = id;
	}

	public static initialize({
		contributor,
		contributorId,
		email,
		id,
	}: {
		contributor: Pick<ContributorModel, "id" | "name">;
		contributorId: number;
		email: string;
		id: number;
	}): GitEmailEntity {
		return new GitEmailEntity({
			contributor,
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
			contributor: null,
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
			contributor: this.contributor as Pick<ContributorModel, "id" | "name">,
			email: this.email,
			id: this.id as number,
		};
	}
}

export { GitEmailEntity };
