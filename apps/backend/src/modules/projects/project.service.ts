import { type Service } from "~/libs/types/types.js";

import { type ProjectRepository } from "./project.repository.js";

class ProjectService implements Service {
	private projectRepository: ProjectRepository;

	public constructor(projectRepository: ProjectRepository) {
		this.projectRepository = projectRepository;
	}

	public create(): ReturnType<Service["create"]> {
		return Promise.resolve(null);
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public findAll(): ReturnType<Service["findAll"]> {
		return Promise.resolve({ items: [] });
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ProjectService };
