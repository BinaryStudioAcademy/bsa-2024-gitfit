import { type Entity } from "~/libs/types/types.js";

import { type ProjectCreateResponseDto } from "./libs/types/types.js";

class ProjectEntity implements Entity {
	private description!: string;

	private id: null | number;

	private name!: string;

	private constructor({
		description,
		id,
		name,
	}: {
		description: string;
		id: null | number;
		name: string;
	}) {
		this.id = id;
		this.description = description;
		this.name = name;
	}

	public static initialize({
		description,
		id,
		name,
	}: {
		description: string;
		id: number;
		name: string;
	}): ProjectEntity {
		return new ProjectEntity({
			description,
			id,
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
			name,
		});
	}

	public getId(): null | number {
		return this.id;
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

	public toObject(): ProjectCreateResponseDto {
		return {
			description: this.description,
			id: this.id as number,
			name: this.name,
		};
	}
}

export { ProjectEntity };
