import { raw } from "objection";

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
		const contributorsWithProjectsAndEmails = await this.contributorModel
			.query()
			.select("contributors.*")
			.select(
				raw(
					"COALESCE(ARRAY_AGG(DISTINCT jsonb_build_object('id', projects.id, 'name', projects.name)) FILTER (WHERE projects.id IS NOT NULL), '{}') AS projects",
				),
			)
			.select(
				raw(
					"COALESCE(ARRAY_AGG(DISTINCT jsonb_build_object('id', git_emails.id, 'email', git_emails.email)) FILTER (WHERE git_emails.id IS NOT NULL), '{}') AS git_emails",
				),
			)
			.leftJoin("git_emails", "contributors.id", "git_emails.contributor_id")
			.leftJoin("activity_logs", "git_emails.id", "activity_logs.git_email_id")
			.leftJoin("projects", "activity_logs.project_id", "projects.id")
			.groupBy("contributors.id");

		return {
			items: contributorsWithProjectsAndEmails.map((contributor) => {
				return ContributorEntity.initialize({
					...contributor,
				});
			}),
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
