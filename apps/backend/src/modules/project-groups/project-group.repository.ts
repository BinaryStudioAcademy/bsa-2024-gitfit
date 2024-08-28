import { transaction } from "objection";

import { type Repository } from "~/libs/types/types.js";

import { ProjectGroupEntity } from "./project-group.entity.js";
import { type ProjectGroupModel } from "./project-group.model.js";

class ProjectGroupRepository implements Repository {
	private projectGroupModel: typeof ProjectGroupModel;

	public constructor(projectGroupModel: typeof ProjectGroupModel) {
		this.projectGroupModel = projectGroupModel;
	}

	public async create(entity: ProjectGroupEntity): Promise<ProjectGroupEntity> {
		const { name, permissionIds, projectId, userIds } = entity.toNewObject();

		//TODO: change with changeCase helper
		const key = this.generateKeyFromName(name);

		const trx = await transaction.start(this.projectGroupModel.knex());

		const projectGroupData = {
			key,
			name,
			permissions: permissionIds,
			projects: projectId,
			users: userIds,
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
			permissionIds,
			projectId,
			userIds,
		});
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Repository["findAll"]> {
		return Promise.resolve([]);
	}

	public async findByName(name: string): Promise<null | ProjectGroupModel> {
		//TODO: change with changeCase helper
		const key = this.generateKeyFromName(name);

		return (await this.projectGroupModel.query().findOne({ key })) ?? null;
	}

	//TODO: remove after adding changeCase helper
	public generateKeyFromName(name: string): string {
		return name.replaceAll(/\s+/g, "_").toLowerCase();
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectGroupRepository };
