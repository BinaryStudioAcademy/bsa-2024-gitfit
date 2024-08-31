import { type Repository } from "~/libs/types/types.js";

import { type ProjectUpdateRequestDto } from "./libs/types/types.js";
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

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | ProjectEntity> {
		const item = await this.projectModel.query().findById(id);

		return item ? ProjectEntity.initialize(item) : null;
	}

	public async findAll(): Promise<ProjectEntity[]> {
		const projects = await this.projectModel.query().execute();

		return projects.map((project) => ProjectEntity.initialize(project));
	}

	public async findByName(name: string): Promise<null | ProjectEntity> {
		const item = await this.projectModel.query().findOne({ name });

		return item ? ProjectEntity.initialize(item) : null;
	}

	public async update(
		id: number,
		projectData: ProjectUpdateRequestDto,
	): Promise<ProjectEntity> {
		const { description, name } = projectData;

		const updatedItem = await this.projectModel
			.query()
			.patchAndFetchById(id, { description, name });

		return ProjectEntity.initialize(updatedItem);
	}
}

export { ProjectRepository };
