import { type Entity } from "~/libs/types/types.js";
import { type GitEmailModel } from "~/modules/git-emails/git-emails.js";

import { type ProjectModel } from "../projects/project.model.js";
import { type UserModel } from "../users/user.model.js";
import { type ActivityLogGetAllItemResponseDto } from "./libs/types/types.js";

class ActivityLogEntity implements Entity {
	private commitsNumber!: number;
	private createdByUser!: Pick<UserModel, "id">;
	private date!: string;
	private gitEmail!: Pick<GitEmailModel, "contributor" | "id">;
	private id: null | number;
	private project!: Pick<ProjectModel, "id">;

	private constructor({
		commitsNumber,
		createdByUser,
		date,
		gitEmail,
		id,
		project,
	}: {
		commitsNumber: number;
		createdByUser: Pick<UserModel, "id">;
		date: string;
		gitEmail: Pick<GitEmailModel, "contributor" | "id">;
		id: null | number;
		project: Pick<ProjectModel, "id">;
	}) {
		this.commitsNumber = commitsNumber;
		this.createdByUser = createdByUser;
		this.date = date;
		this.gitEmail = gitEmail;
		this.id = id;
		this.project = project;
	}

	public static initialize({
		commitsNumber,
		createdByUser,
		date,
		gitEmail,
		id,
		project,
	}: {
		commitsNumber: number;
		createdByUser: Pick<UserModel, "id">;
		date: string;
		gitEmail: Pick<GitEmailModel, "contributor" | "id">;
		id: null | number;
		project: Pick<ProjectModel, "id">;
	}): ActivityLogEntity {
		return new ActivityLogEntity({
			commitsNumber,
			createdByUser,
			date,
			gitEmail,
			id,
			project,
		});
	}

	public static initializeNew({
		commitsNumber,
		createdByUser,
		date,
		gitEmail,
		project,
	}: {
		commitsNumber: number;
		createdByUser: Pick<UserModel, "id">;
		date: string;
		gitEmail: Pick<GitEmailModel, "contributor" | "id">;
		project: Pick<ProjectModel, "id">;
	}): ActivityLogEntity {
		return new ActivityLogEntity({
			commitsNumber,
			createdByUser,
			date,
			gitEmail,
			id: null,
			project,
		});
	}

	public toNewObject(): {
		commitsNumber: number;
		createdByUser: Pick<UserModel, "id">;
		date: string;
		gitEmail: Pick<GitEmailModel, "contributor" | "id">;
		project: Pick<ProjectModel, "id">;
	} {
		return {
			commitsNumber: this.commitsNumber,
			createdByUser: this.createdByUser,
			date: this.date,
			gitEmail: this.gitEmail,
			project: this.project,
		};
	}

	public toObject(): ActivityLogGetAllItemResponseDto {
		return {
			commitsNumber: this.commitsNumber,
			createdByUser: { id: this.createdByUser.id },
			date: this.date,
			gitEmail: {
				contributor: this.gitEmail.contributor,
				id: this.gitEmail.id,
			},
			id: this.id as number,
			project: { id: this.project.id },
		};
	}
}

export { ActivityLogEntity };
