import { type Entity } from "~/libs/types/types.js";

import { type ContributorGetAllItemResponseDto } from "./libs/types/types.js";

class ContributorEntity implements Entity {
	private gitEmails: { email: string; id: number }[];
	private hiddenAt: null | string;
	private id: null | number;
	private lastActivityDate: null | string;
	private name: string;
	private projects: { id: number; name: string }[];

	private constructor({
		gitEmails,
		hiddenAt,
		id,
		lastActivityDate,
		name,
		projects,
	}: {
		gitEmails: { email: string; id: number }[];
		hiddenAt: null | string;
		id: null | number;
		lastActivityDate: null | string;
		name: string;
		projects: { id: number; name: string }[];
	}) {
		this.gitEmails = gitEmails;
		this.id = id;
		this.hiddenAt = hiddenAt;
		this.lastActivityDate = lastActivityDate;
		this.name = name;
		this.projects = projects;
	}

	public static initialize({
		gitEmails,
		hiddenAt,
		id,
		lastActivityDate,
		name,
		projects,
	}: {
		gitEmails: { email: string; id: number }[];
		hiddenAt: null | string;
		id: number;
		lastActivityDate: null | string;
		name: string;
		projects: { id: number; name: string }[];
	}): ContributorEntity {
		return new ContributorEntity({
			gitEmails,
			hiddenAt,
			id,
			lastActivityDate,
			name,
			projects,
		});
	}

	public static initializeNew({
		gitEmails = [],
		hiddenAt = null,
		name,
		projects = [],
	}: {
		gitEmails?: { email: string; id: number }[];
		hiddenAt?: null | string;
		name: string;
		projects?: { id: number; name: string }[];
	}): ContributorEntity {
		return new ContributorEntity({
			gitEmails,
			hiddenAt,
			id: null,
			lastActivityDate: null,
			name,
			projects,
		});
	}

	public toNewObject(): {
		gitEmails: { email: string; id: number }[];
		hiddenAt: null | string;
		lastActivityDate: null | string;
		name: string;
		projects: { id: number; name: string }[];
	} {
		return {
			gitEmails: this.gitEmails,
			hiddenAt: this.hiddenAt,
			lastActivityDate: this.lastActivityDate,
			name: this.name,
			projects: this.projects,
		};
	}

	public toObject(): ContributorGetAllItemResponseDto {
		return {
			gitEmails: this.gitEmails,
			hiddenAt: this.hiddenAt,
			id: this.id as number,
			lastActivityDate: this.lastActivityDate,
			name: this.name,
			projects: this.projects,
		};
	}
}

export { ContributorEntity };
