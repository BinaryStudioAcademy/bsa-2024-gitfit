import { SortType } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { type ProjectPatchRequestDto } from "./libs/types/types.js";
import { ProjectEntity } from "./project.entity.js";
import { type ProjectModel } from "./project.model.js";

class ProjectRepository implements Repository {
	private projectModel: typeof ProjectModel;

	public constructor(projectModel: typeof ProjectModel) {
		this.projectModel = projectModel;
	}

	public async create(entity: ProjectEntity): Promise<ProjectEntity> {
		const { description, name } = entity.toNewObject();

		const user = await this.projectModel
			.query()
			.insert({
				description,
				name,
			})
			.returning("*")
			.execute();

		return ProjectEntity.initialize(user);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedRowsCount = await this.projectModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedRowsCount);
	}

	public async find(id: number): Promise<null | ProjectEntity> {
		const item = await this.projectModel.query().findById(id);

		return item ? ProjectEntity.initialize(item) : null;
	}

	public async findAll(name?: string): Promise<{ items: ProjectEntity[] }> {
		const query = this.projectModel
			.query()
			.orderBy("created_at", SortType.DESCENDING);

		if (name) {
			query.whereILike("name", `%${name}%`);
		}

		const projects = await query.execute();

		return {
			items: projects.map((project) => ProjectEntity.initialize(project)),
		};
	}

	public async findByName(name: string): Promise<null | ProjectEntity> {
		const item = await this.projectModel.query().findOne({ name });

		return item ? ProjectEntity.initialize(item) : null;
	}

	public async findProjectsByContributorId(
		contributorId: number,
	): Promise<{ items: ProjectEntity[] }> {
		const projects = await this.projectModel
			.query()
			.select("projects.*")
			.join("activity_logs", "activity_logs.project_id", "projects.id")
			.join("git_emails", "git_emails.id", "activity_logs.git_email_id")
			.where("git_emails.contributor_id", contributorId)
			.distinct();

		return {
			items: projects.map((project) => ProjectEntity.initialize(project)),
		};
	}

	public async patch(
		id: number,
		projectData: ProjectPatchRequestDto,
	): Promise<ProjectEntity> {
		const { description, name } = projectData;

		const updatedItem = await this.projectModel
			.query()
			.patchAndFetchById(id, { description, name });

		return ProjectEntity.initialize(updatedItem);
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectRepository };
