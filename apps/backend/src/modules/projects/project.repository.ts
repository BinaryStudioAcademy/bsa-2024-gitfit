import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { SortType } from "~/libs/enums/enums.js";
import { subtractDays } from "~/libs/helpers/helpers.js";
import {
	type PaginationResponseDto,
	type Repository,
} from "~/libs/types/types.js";

import {
	type ProjectGetAllRequestDto,
	type ProjectPatchRequestDto,
} from "./libs/types/types.js";
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
		const item = await this.projectModel
			.query()
			.select(
				"projects.*",
				"activityLogs.date as analyticsLastSyncedAt",
				"users.name as analyticsLastSyncedByUser",
			)
			.from("projects")
			.leftJoin("activityLogs", "projects.id", "activityLogs.projectId")
			.leftJoin("users", "activityLogs.createdByUserId", "users.id")
			.where("projects.id", id)
			.orderBy("activityLogs.date", SortType.DESCENDING)
			.first();

		return item ? ProjectEntity.initialize(item) : null;
	}

	public async findAll({
		name,
		page,
		pageSize,
		userProjectIds,
	}: { userProjectIds?: number[] } & ProjectGetAllRequestDto): Promise<
		PaginationResponseDto<ProjectEntity>
	> {
		const query = this.projectModel
			.query()
			.orderBy("createdAt", SortType.DESCENDING);

		if (name) {
			query.whereILike("name", `%${name}%`);
		}

		if (userProjectIds && userProjectIds.length !== EMPTY_LENGTH) {
			query.whereIn("id", userProjectIds);
		}

		const { results, total } = await query.page(page, pageSize);

		return {
			items: results.map((project) => ProjectEntity.initialize(project)),
			totalItems: total,
		};
	}

	public async findAllWithoutPagination({
		userProjectIds,
	}: {
		userProjectIds?: number[];
	}): Promise<ProjectEntity[]> {
		const query = this.projectModel.query();

		if (userProjectIds && userProjectIds.length !== EMPTY_LENGTH) {
			query.whereIn("id", userProjectIds);
		}

		const projects = await query
			.orderBy("createdAt", SortType.DESCENDING)
			.execute();

		return projects.map((project) => ProjectEntity.initialize(project));
	}

	public async findByName(name: string): Promise<null | ProjectEntity> {
		const item = await this.projectModel.query().findOne({ name });

		return item ? ProjectEntity.initialize(item) : null;
	}

	public async findInactiveProjects(
		thresholdInDays: number,
	): Promise<ProjectEntity[]> {
		const projects = await this.projectModel
			.query()
			.where(
				"lastActivityDate",
				"<",
				subtractDays(new Date(), thresholdInDays).toISOString(),
			)
			.execute();

		return projects.map((project) => ProjectEntity.initialize(project));
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

	public async updateLastActivityDate(
		projectId: number,
		lastActivityDate: string,
	): Promise<void> {
		await this.projectModel
			.query()
			.patch({ lastActivityDate })
			.where({ id: projectId })
			.execute();
	}
}

export { ProjectRepository };
