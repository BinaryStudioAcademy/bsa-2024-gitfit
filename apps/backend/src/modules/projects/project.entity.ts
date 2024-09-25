import { type Entity } from "~/libs/types/types.js";

import { type ProjectGetByIdResponseDto } from "./libs/types/types.js";

class ProjectEntity implements Entity {
	private analyticsLastSyncedAt: null | string;

	private analyticsLastSyncedByUser: null | string;

	private description!: string;

	private id: null | number;

	private lastActivityDate!: null | string;

	private name!: string;

	private constructor({
		analyticsLastSyncedAt,
		analyticsLastSyncedByUser,
		description,
		id,
		lastActivityDate,
		name,
	}: {
		analyticsLastSyncedAt: null | string;
		analyticsLastSyncedByUser: null | string;
		description: string;
		id: null | number;
		lastActivityDate: null | string;
		name: string;
	}) {
		this.analyticsLastSyncedAt = analyticsLastSyncedAt;
		this.analyticsLastSyncedByUser = analyticsLastSyncedByUser;
		this.id = id;
		this.description = description;
		this.lastActivityDate = lastActivityDate;
		this.name = name;
	}

	public static initialize({
		analyticsLastSyncedAt,
		analyticsLastSyncedByUser,
		description,
		id,
		lastActivityDate,
		name,
	}: {
		analyticsLastSyncedAt: string;
		analyticsLastSyncedByUser: null | string;
		description: string;
		id: number;
		lastActivityDate: string;
		name: string;
	}): ProjectEntity {
		return new ProjectEntity({
			analyticsLastSyncedAt,
			analyticsLastSyncedByUser,
			description,
			id,
			lastActivityDate,
			name,
		});
	}

	public static initializeNew({
		description,
		name,
	}: {
		description: string;
		name: string;
	}): ProjectEntity {
		return new ProjectEntity({
			analyticsLastSyncedAt: null,
			analyticsLastSyncedByUser: null,
			description,
			id: null,
			lastActivityDate: null,
			name,
		});
	}

	public toNewObject(): {
		description: string;
		name: string;
	} {
		return {
			description: this.description,
			name: this.name,
		};
	}

	public toObject(): Pick<
		ProjectGetByIdResponseDto,
		| "analyticsLastSyncedAt"
		| "analyticsLastSyncedByUser"
		| "description"
		| "id"
		| "lastActivityDate"
		| "name"
	> {
		return {
			analyticsLastSyncedAt: this.analyticsLastSyncedAt,
			analyticsLastSyncedByUser: this.analyticsLastSyncedByUser,
			description: this.description,
			id: this.id as number,
			lastActivityDate: this.lastActivityDate,
			name: this.name,
		};
	}
}

export { ProjectEntity };
