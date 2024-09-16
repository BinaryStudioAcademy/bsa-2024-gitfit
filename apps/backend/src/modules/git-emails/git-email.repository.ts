import { type Repository } from "~/libs/types/types.js";

import { GitEmailEntity } from "./git-email.entity.js";
import { type GitEmailModel } from "./git-email.model.js";

class GitEmailRepository implements Repository {
	private gitEmailModel: typeof GitEmailModel;

	public constructor(gitEmailModel: typeof GitEmailModel) {
		this.gitEmailModel = gitEmailModel;
	}

	public async create(entity: GitEmailEntity): Promise<GitEmailEntity> {
		const { contributorId, email } = entity.toNewObject();

		const gitEmail = await this.gitEmailModel
			.query()
			.insert({
				contributorId,
				email,
			})
			.withGraphFetched("contributor")
			.modifyGraph("contributor", (builder) => {
				builder.select("id", "name");
			})
			.execute();

		return GitEmailEntity.initialize(gitEmail);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public async findByEmail(email: string): Promise<GitEmailEntity | null> {
		const item = await this.gitEmailModel
			.query()
			.findOne({ email })
			.withGraphFetched("contributor")
			.modifyGraph("contributor", (builder) => {
				builder.select("id", "name");
			})
			.execute();

		return item ? GitEmailEntity.initialize(item) : null;
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { GitEmailRepository };
