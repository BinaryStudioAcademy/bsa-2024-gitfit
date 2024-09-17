import { type Entity } from "~/libs/types/types.js";

import { type ProjectGetByIdResponseDto } from "./libs/types/types.js";

class ProjectEntity implements Entity {
	private description!: string;

	private id: null | number;

	private lastActivityDate!: null | string;

	private name!: string;

	private constructor({
		description,
		id,
		lastActivityDate,
		name,
	}: {
		description: string;
		id: null | number;
		lastActivityDate: null | string;
		name: string;
	}) {
		this.id = id;
		this.description = description;
		this.lastActivityDate = lastActivityDate;
		this.name = name;
	}

	public static initialize({
		description,
		id,
		lastActivityDate,
		name,
	}: {
		description: string;
		id: number;
		lastActivityDate: string;
		name: string;
	}): ProjectEntity {
		return new ProjectEntity({
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
		"description" | "id" | "lastActivityDate" | "name"
	> {
		return {
			description: this.description,
			id: this.id as number,
			lastActivityDate: this.lastActivityDate,
			name: this.name,
		};
	}
}

export { ProjectEntity };
