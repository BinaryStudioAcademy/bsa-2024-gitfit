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
			.insert({ name })
			.execute();

		return ContributorEntity.initialize({ ...contributor, projects: [] });
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<ContributorEntity | null> {
		const contributor = await this.contributorModel
			.query()
			.findById(id)
			.withGraphFetched("gitEmails");

		if (!contributor) {
			return null;
		}

		return ContributorEntity.initialize({ ...contributor, projects: [] });
	}

	public async findAll(): Promise<{ items: ContributorEntity[] }> {
		const contributors = await this.contributorModel
			.query()
			.withGraphFetched("gitEmails");

		return {
			items: contributors.map((contributor) =>
				ContributorEntity.initialize({ ...contributor, projects: [] }),
			),
		};
	}

	public async findByName(name: string): Promise<ContributorEntity | null> {
		const contributor = await this.contributorModel
			.query()
			.findOne({ name })
			.withGraphFetched("gitEmails");

		if (!contributor) {
			return null;
		}

		return ContributorEntity.initialize({ ...contributor, projects: [] });
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ContributorRepository };
