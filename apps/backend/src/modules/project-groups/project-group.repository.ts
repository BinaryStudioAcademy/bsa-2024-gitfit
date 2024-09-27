import { transaction } from "objection";

import { ProjectPermissionKey, SortType } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/libs/enums/enums.js";
import {
	type PaginationQueryParameters,
	type PaginationResponseDto,
	type Repository,
} from "~/libs/types/types.js";
import { type ProjectModel } from "~/modules/projects/project.model.js";

import { ExceptionMessage } from "./libs/enums/enums.js";
import { ProjectGroupError } from "./libs/exceptions/exceptions.js";
import { generateProjectGroupKey } from "./libs/helpers/helpers.js";
import { ProjectGroupEntity } from "./project-group.entity.js";
import { type ProjectGroupModel } from "./project-group.model.js";

class ProjectGroupRepository implements Repository {
	private projectGroupModel: typeof ProjectGroupModel;

	public constructor(projectGroupModel: typeof ProjectGroupModel) {
		this.projectGroupModel = projectGroupModel;
	}

	public async create(entity: ProjectGroupEntity): Promise<ProjectGroupEntity> {
		const { name, permissions, projectId, users } = entity.toNewObject();
		const key = generateProjectGroupKey({
			name,
			projectId: projectId.id,
		});

		const trx = await transaction.start(this.projectGroupModel.knex());

		try {
			const projectGroupData = {
				key,
				name,
				permissions,
				projects: [projectId],
				users,
			};

			const createdProjectGroup = await this.projectGroupModel
				.query(trx)
				.insertGraph(projectGroupData, { relate: true })
				.returning("*")
				.withGraphFetched("[permissions, projects, users]");

			await trx.commit();

			return ProjectGroupEntity.initialize({
				...createdProjectGroup,
				projectId,
			});
		} catch {
			await trx.rollback();

			throw new ProjectGroupError({
				message: ExceptionMessage.PROJECT_GROUP_CREATE_FAILED,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	public async delete(id: number): Promise<boolean> {
		const deletedRowsCount = await this.projectGroupModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedRowsCount);
	}

	public async deleteByProjectId(projectId: number): Promise<boolean> {
		const deletedRowsCount = await this.projectGroupModel
			.query()
			.delete()
			.withGraphJoined("[projects]")
			.where("projects.id", projectId);

		return Boolean(deletedRowsCount);
	}

	public async find(id: number): Promise<null | ProjectGroupEntity> {
		const projectGroup = await this.projectGroupModel
			.query()
			.findById(id)
			.withGraphFetched("[permissions, projects, users]")
			.modifyGraph("users", (builder) => {
				builder.whereNull("deletedAt");
			});

		if (projectGroup) {
			const [project] = projectGroup.projects as [ProjectModel];

			return ProjectGroupEntity.initialize({
				...projectGroup,
				projectId: project,
			});
		}

		return null;
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public async findAllByProjectId(
		id: number,
		{ page, pageSize }: PaginationQueryParameters,
	): Promise<PaginationResponseDto<ProjectGroupEntity>> {
		const { results, total } = await this.projectGroupModel
			.query()
			.orderBy("createdAt", SortType.DESCENDING)
			.page(page, pageSize)
			.joinRelated("projects")
			.where("projects.id", id)
			.withGraphFetched("[permissions, users, projects]")
			.modifyGraph("users", (builder) => {
				builder.whereNull("deletedAt");
			});

		return {
			items: results.map((projectGroup) =>
				ProjectGroupEntity.initialize({
					...projectGroup,
					projectId: { id },
				}),
			),
			totalItems: total,
		};
	}

	public async findAllByUserId(userId: number): Promise<ProjectGroupEntity[]> {
		const results = await this.projectGroupModel
			.query()
			.orderBy("createdAt", SortType.DESCENDING)
			.withGraphJoined("[projects, users, permissions]")
			.where("users.id", userId)
			.andWhere("permissions.key", "in", [
				ProjectPermissionKey.VIEW_PROJECT,
				ProjectPermissionKey.EDIT_PROJECT,
				ProjectPermissionKey.MANAGE_PROJECT,
			]);

		return results.map(({ projects, ...projectGroup }) => {
			const [project] = projects;

			return ProjectGroupEntity.initialize({
				...projectGroup,
				projectId: { id: (project as ProjectModel).id },
			});
		});
	}

	public async findByProjectIdAndName({
		name,
		projectId,
	}: {
		name: string;
		projectId: number;
	}): Promise<null | ProjectGroupModel> {
		const key = generateProjectGroupKey({
			name,
			projectId,
		});

		return (
			(await this.projectGroupModel
				.query()
				.findOne({ key })
				.withGraphJoined("projects")
				.where("projects.id", projectId)) ?? null
		);
	}

	public async update(
		id: number,
		entity: ProjectGroupEntity,
	): Promise<ProjectGroupEntity> {
		const { name, permissions, projectId, users } = entity.toNewObject();
		const key = generateProjectGroupKey({
			name,
			projectId: projectId.id,
		});

		const trx = await transaction.start(this.projectGroupModel.knex());

		const projectGroupData = {
			id,
			key,
			name,
			permissions,
			projects: [projectId],
			users,
		};

		const updatedProjectGroup = await this.projectGroupModel
			.query(trx)
			.upsertGraph(projectGroupData, {
				relate: true,
				unrelate: true,
			})
			.returning("*")
			.withGraphFetched("[permissions, projects, users]");

		await trx.commit();

		return ProjectGroupEntity.initialize({
			...updatedProjectGroup,
			projectId,
		});
	}
}

export { ProjectGroupRepository };
