import { type Entity } from "~/libs/types/types.js";

import { type ProjectModel } from "../projects/project.model.js";
import { type UserModel } from "../users/user.model.js";
import { type ContributorModel } from "./contributor.model.js";
import { type GitEmailModel } from "./git-email.model.js";
import { type ActivityLogGetAllItemResponseDto } from "./libs/types/types.js";

class ActivityLogEntity implements Entity {
	private commitsNumber!: number;
	private contributor!: Pick<ContributorModel, "id" | "name">;
	private createdByUser!: Pick<UserModel, "id">;
	private date!: string;
	private gitEmail!: Pick<GitEmailModel, "id">;
	private id: null | number;
	private project!: Pick<ProjectModel, "id">;

	private constructor({
		commitsNumber,
		contributor,
		createdByUser,
		date,
		gitEmail,
		id,
		project,
	}: {
		commitsNumber: number;
		contributor: Pick<ContributorModel, "id" | "name">;
		createdByUser: Pick<UserModel, "id">;
		date: string;
		gitEmail: Pick<GitEmailModel, "id">;
		id: null | number;
		project: Pick<ProjectModel, "id">;
	}) {
		this.commitsNumber = commitsNumber;
		this.contributor = contributor;
		this.createdByUser = createdByUser;
		this.date = date;
		this.gitEmail = gitEmail;
		this.id = id;
		this.project = project;
	}

	public static initialize({
		commitsNumber,
		contributor,
		createdByUser,
		date,
		gitEmail,
		id,
		project,
	}: {
		commitsNumber: number;
		contributor: Pick<ContributorModel, "id" | "name">;
		createdByUser: Pick<UserModel, "id">;
		date: string;
		gitEmail: Pick<GitEmailModel, "id">;
		id: null | number;
		project: Pick<ProjectModel, "id">;
	}): ActivityLogEntity {
		return new ActivityLogEntity({
			commitsNumber,
			contributor,
			createdByUser,
			date,
			gitEmail,
			id,
			project,
		});
	}

	public static initializeNew({
		commitsNumber,
		contributor,
		createdByUser,
		date,
		gitEmail,
		project,
	}: {
		commitsNumber: number;
		contributor: Pick<ContributorModel, "id" | "name">;
		createdByUser: Pick<UserModel, "id">;
		date: string;
		gitEmail: Pick<GitEmailModel, "id">;
		project: Pick<ProjectModel, "id">;
	}): ActivityLogEntity {
		return new ActivityLogEntity({
			commitsNumber,
			contributor,
			createdByUser,
			date,
			gitEmail,
			id: null,
			project,
		});
	}

	public toNewObject(): {
		commitsNumber: number;
		contributor: Pick<ContributorModel, "id" | "name">;
		createdByUser: Pick<UserModel, "id">;
		date: string;
		gitEmail: Pick<GitEmailModel, "id">;
		project: Pick<ProjectModel, "id">;
	} {
		return {
			commitsNumber: this.commitsNumber,
			contributor: this.contributor,
			createdByUser: this.createdByUser,
			date: this.date,
			gitEmail: this.gitEmail,
			project: this.project,
		};
	}

	public toObject(): ActivityLogGetAllItemResponseDto {
		return {
			commitsNumber: this.commitsNumber,
			contributor: this.contributor,
			createdByUser: { id: this.createdByUser.id },
			date: this.date,
			gitEmail: { id: this.gitEmail.id },
			id: this.id as number,
			project: { id: this.project.id },
		};
	}
}

export { ActivityLogEntity };
