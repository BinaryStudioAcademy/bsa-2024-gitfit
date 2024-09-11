import { type Repository } from "~/libs/types/types.js";

import { ContributorEntity } from "./contributor.entity.js";
import { type ContributorModel } from "./contributor.model.js";

class ContributorRepository implements Repository {
	private contributorModel: typeof ContributorModel;

	public constructor(contributorModel: typeof ContributorModel) {
		this.contributorModel = contributorModel;
	}

	public async create(entity: ContributorEntity): Promise<ContributorEntity> {
		const { name } = entity.toNewObject();

		const contributor = await this.contributorModel
			.query()
			.insert({
				name,
			})
			.execute();

		return ContributorEntity.initialize(contributor);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<ContributorEntity | null> {
		const item = await this.contributorModel.query().findById(id).execute();

		return item ? ContributorEntity.initialize(item) : null;
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public async findByName(name: string): Promise<ContributorEntity | null> {
		const item = await this.contributorModel
			.query()
			.findOne({ name })
			.execute();

		return item ? ContributorEntity.initialize(item) : null;
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ContributorRepository };
