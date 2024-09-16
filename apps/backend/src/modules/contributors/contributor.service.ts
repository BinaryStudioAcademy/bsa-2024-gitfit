import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { type ProjectService } from "../projects/project.service.js";
import { ContributorEntity } from "./contributor.entity.js";
import { type ContributorRepository } from "./contributor.repository.js";
import { ContributorError } from "./libs/exceptions/exceptions.js";
import {
	type ContributorCreateRequestDto,
	type ContributorGetAllItemResponseDto,
	type ContributorGetAllResponseDto,
} from "./libs/types/types.js";

class ContributorService implements Service {
	private contributorRepository: ContributorRepository;
	private projectService: ProjectService;

	public constructor(
		contributorRepository: ContributorRepository,
		projectService: ProjectService,
	) {
		this.contributorRepository = contributorRepository;
		this.projectService = projectService;
	}

	public async create(
		payload: ContributorCreateRequestDto,
	): Promise<ContributorGetAllItemResponseDto> {
		const { name } = payload;

		const existingContributor =
			await this.contributorRepository.findByName(name);

		if (existingContributor) {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_NAME_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const item = await this.contributorRepository.create(
			ContributorEntity.initializeNew({
				name,
			}),
		);

		return item.toObject();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<ContributorGetAllItemResponseDto> {
		const item = await this.contributorRepository.find(id);

		if (!item) {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const projects = await this.projectService.findProjectsByContributorId(id);

		return { ...item.toObject(), projects: projects.items };
	}

	public async findAll(): Promise<ContributorGetAllResponseDto> {
		const contributors = await this.contributorRepository.findAll();

		const contributorsWithProjects = await Promise.all(
			contributors.items.map(async (contributor) => {
				const projects = await this.projectService.findProjectsByContributorId(
					contributor.toObject().id,
				);

				return { ...contributor.toObject(), projects: projects.items };
			}),
		);

		return { items: contributorsWithProjects };
	}

	public async findByName(
		name: string,
	): Promise<ContributorGetAllItemResponseDto | null> {
		const item = await this.contributorRepository.findByName(name);

		if (!item) {
			return null;
		}

		const projects = await this.projectService.findProjectsByContributorId(
			item.toObject().id,
		);

		return { ...item.toObject(), projects: projects.items };
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ContributorService };
