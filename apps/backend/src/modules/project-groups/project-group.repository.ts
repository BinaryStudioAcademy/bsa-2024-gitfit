import { transaction } from "objection";

import { changeCase } from "~/libs/helpers/helpers.js";
import { HTTPCode } from "~/libs/modules/http/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { ExceptionMessage } from "./libs/enums/enums.js";
import { ProjectGroupError } from "./libs/exceptions/exceptions.js";
import { ProjectGroupEntity } from "./project-group.entity.js";
import { type ProjectGroupModel } from "./project-group.model.js";

class ProjectGroupRepository implements Repository {
	private projectGroupModel: typeof ProjectGroupModel;

	public constructor(projectGroupModel: typeof ProjectGroupModel) {
		this.projectGroupModel = projectGroupModel;
	}

	public async create(entity: ProjectGroupEntity): Promise<ProjectGroupEntity> {
		const { name, permissions, projectId, users } = entity.toNewObject();
		const key = changeCase(name, "snakeCase");

		const trx = await transaction.start(this.projectGroupModel.knex());

		try {
			const projectGroupData = {
				key,
				name,
				permissions,
				projects: projectId,
				users,
			};

			const createdProjectGroup = await this.projectGroupModel
				.query(trx)
				.insertGraph(projectGroupData, { relate: true })
				.returning("*")
				.withGraphJoined("[permissions, projects, users]");

			await trx.commit();

			return ProjectGroupEntity.initialize({
				id: createdProjectGroup.id,
				name: createdProjectGroup.name,
				permissions,
				projectId,
				users,
			});
		} catch {
			await trx.rollback();

			throw new ProjectGroupError({
				message: ExceptionMessage.PROJECT_GROUP_CREATE_FAILED,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | ProjectGroupEntity> {
		const projectGroup = await this.projectGroupModel.query().findById(id);

		return projectGroup ? ProjectGroupEntity.initialize(projectGroup) : null;
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public async findInProjectByName(
		projectId: number,
		name: string,
	): Promise<null | ProjectGroupModel> {
		const key = changeCase(name, "snakeCase");

		return (
			(await this.projectGroupModel.query().findOne({ key, projectId })) ?? null
		);
	}

	public async update(
		id: number,
		entity: ProjectGroupEntity,
	): Promise<ProjectGroupEntity> {
		const { name, permissions, projectId, users } = entity.toNewObject();
		const key = changeCase(name, "snakeCase");

		const trx = await transaction.start(this.projectGroupModel.knex());

		const groupData = {
			id,
			key,
			name,
			permissions,
			projects: projectId,
			users,
		};

		const projectGroup = await this.projectGroupModel
			.query(trx)
			.upsertGraph(groupData, {
				relate: true,
				unrelate: true,
			})
			.returning("*")
			.withGraphFetched("[permissions, projects, users]");

		await trx.commit();

		return ProjectGroupEntity.initialize(projectGroup);
	}
}

export { ProjectGroupRepository };
