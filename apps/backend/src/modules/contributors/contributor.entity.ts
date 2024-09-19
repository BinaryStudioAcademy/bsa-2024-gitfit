import { type Entity } from "~/libs/types/types.js";

import { type ContributorGetAllItemResponseDto } from "./libs/types/types.js";

class ContributorEntity implements Entity {
	private gitEmails: { email: string; id: number }[];
	private id: null | number;
	private isHidden: boolean;
	private name: string;
	private projects: { id: number; name: string }[];

	private constructor({
		gitEmails,
		id,
		isHidden,
		name,
		projects,
	}: {
		gitEmails: { email: string; id: number }[];
		id: null | number;
		isHidden: boolean;
		name: string;
		projects: { id: number; name: string }[];
	}) {
		this.gitEmails = gitEmails;
		this.id = id;
		this.isHidden = isHidden;
		this.name = name;
		this.projects = projects;
	}

	public static initialize({
		gitEmails,
		id,
		isHidden,
		name,
		projects,
	}: {
		gitEmails: { email: string; id: number }[];
		id: number;
		isHidden: boolean;
		name: string;
		projects: { id: number; name: string }[];
	}): ContributorEntity {
		return new ContributorEntity({
			gitEmails,
			id,
			isHidden,
			name,
			projects,
		});
	}

	public static initializeNew({
		gitEmails = [],
		isHidden = false,
		name,
		projects = [],
	}: {
		gitEmails?: { email: string; id: number }[];
		isHidden?: boolean;
		name: string;
		projects?: { id: number; name: string }[];
	}): ContributorEntity {
		return new ContributorEntity({
			gitEmails,
			id: null,
			isHidden,
			name,
			projects,
		});
	}

	public toNewObject(): {
		gitEmails: { email: string; id: number }[];
		isHidden: boolean;
		name: string;
		projects: { id: number; name: string }[];
	} {
		return {
			gitEmails: this.gitEmails,
			isHidden: this.isHidden,
			name: this.name,
			projects: this.projects,
		};
	}

	public toObject(): ContributorGetAllItemResponseDto {
		return {
			gitEmails: this.gitEmails,
			id: this.id as number,
			isHidden: this.isHidden,
			name: this.name,
			projects: this.projects,
		};
	}
}

export { ContributorEntity };
