import { SortType } from "~/libs/enums/enums.js";
import {
	type InfiniteScrollResponseDto,
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
		const item = await this.projectModel.query().findById(id);

		return item ? ProjectEntity.initialize(item) : null;
	}

	public async findAll(
		parameters: ProjectGetAllRequestDto,
	): Promise<InfiniteScrollResponseDto<ProjectEntity>> {
		const { limit, name, start } = parameters;

		const query = this.projectModel
			.query()
			.orderBy("created_at", SortType.DESCENDING)
			.limit(limit)
			.offset(start);

		if (name) {
			query.whereILike("name", `%${name}%`);
		}

		const totalItems = await query.resultSize();

		const results = await query.limit(limit).offset(start);

		return {
			items: results.map((project) => ProjectEntity.initialize(project)),
			totalItems,
		};
	}

	public async findByName(name: string): Promise<null | ProjectEntity> {
		const item = await this.projectModel.query().findOne({ name });

		return item ? ProjectEntity.initialize(item) : null;
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
