import { type Entity } from "~/libs/types/types.js";

import { type ContributorGetAllItemResponseDto } from "./libs/types/types.js";

class ContributorEntity implements Entity {
	private gitEmails: { email: string; id: number }[];
	private id: null | number;
	private name: string;
	private projects: { id: number; name: string }[];

	private constructor({
		gitEmails,
		id,
		name,
		projects,
	}: {
		gitEmails: { email: string; id: number }[];
		id: null | number;
		name: string;
		projects: { id: number; name: string }[];
	}) {
		this.id = id;
		this.name = name;
		this.gitEmails = gitEmails;
		this.projects = projects;
	}

	public static initialize({
		gitEmails,
		id,
		name,
		projects,
	}: {
		gitEmails: { email: string; id: number }[];
		id: number;
		name: string;
		projects: { id: number; name: string }[];
	}): ContributorEntity {
		return new ContributorEntity({
			gitEmails,
			id,
			name,
			projects,
		});
	}

	public static initializeNew({
		gitEmails = [],
		name,
		projects = [],
	}: {
		gitEmails?: { email: string; id: number }[];
		name: string;
		projects?: { id: number; name: string }[];
	}): ContributorEntity {
		return new ContributorEntity({
			gitEmails,
			id: null,
			name,
			projects,
		});
	}

	public toNewObject(): {
		gitEmails: { email: string; id: number }[];
		name: string;
		projects: { id: number; name: string }[];
	} {
		return {
			gitEmails: this.gitEmails,
			name: this.name,
			projects: this.projects,
		};
	}

	public toObject(): ContributorGetAllItemResponseDto {
		return {
			gitEmails: this.gitEmails,
			id: this.id as number,
			name: this.name,
			projects: this.projects,
		};
	}
}

export { ContributorEntity };
