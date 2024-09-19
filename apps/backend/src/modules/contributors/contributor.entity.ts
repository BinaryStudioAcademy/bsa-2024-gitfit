import { type Entity } from "~/libs/types/types.js";

import { type ContributorGetAllItemResponseDto } from "./libs/types/types.js";

class ContributorEntity implements Entity {
	private gitEmails: { email: string; id: number }[];
	private id: null | number;
	private lastActivityDate: null | string;
	private name: string;
	private projects: { id: number; name: string }[];

	private constructor({
		gitEmails,
		id,
		lastActivityDate,
		name,
		projects,
	}: {
		gitEmails: { email: string; id: number }[];
		id: null | number;
		lastActivityDate: null | string;
		name: string;
		projects: { id: number; name: string }[];
	}) {
		this.id = id;
		this.name = name;
		this.lastActivityDate = lastActivityDate;
		this.gitEmails = gitEmails;
		this.projects = projects;
	}

	public static initialize({
		gitEmails,
		id,
		lastActivityDate,
		name,
		projects,
	}: {
		gitEmails: { email: string; id: number }[];
		id: number;
		lastActivityDate: null | string;
		name: string;
		projects: { id: number; name: string }[];
	}): ContributorEntity {
		return new ContributorEntity({
			gitEmails,
			id,
			lastActivityDate,
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
			lastActivityDate: null,
			name,
			projects,
		});
	}

	public toNewObject(): {
		gitEmails: { email: string; id: number }[];
		lastActivityDate: null | string;
		name: string;
		projects: { id: number; name: string }[];
	} {
		return {
			gitEmails: this.gitEmails,
			lastActivityDate: this.lastActivityDate,
			name: this.name,
			projects: this.projects,
		};
	}

	public toObject(): ContributorGetAllItemResponseDto {
		return {
			gitEmails: this.gitEmails,
			id: this.id as number,
			lastActivityDate: this.lastActivityDate,
			name: this.name,
			projects: this.projects,
		};
	}
}

export { ContributorEntity };
