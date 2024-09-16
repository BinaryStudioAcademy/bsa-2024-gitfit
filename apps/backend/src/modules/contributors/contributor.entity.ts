import { type Entity } from "~/libs/types/types.js";

import { type ContributorGetAllItemResponseDto } from "./libs/types/types.js";

class ContributorEntity implements Entity {
	private id: null | number;

	private name: string;

	private constructor({ id, name }: { id: null | number; name: string }) {
		this.id = id;
		this.name = name;
	}

	public static initialize({
		id,
		name,
	}: {
		id: number;
		name: string;
	}): ContributorEntity {
		return new ContributorEntity({
			id,
			name,
		});
	}

	public static initializeNew({ name }: { name: string }): ContributorEntity {
		return new ContributorEntity({
			id: null,
			name,
		});
	}

	public toNewObject(): {
		name: string;
	} {
		return {
			name: this.name,
		};
	}

	public toObject(): ContributorGetAllItemResponseDto {
		return {
			id: this.id as number,
			name: this.name,
		};
	}
}

export { ContributorEntity };
