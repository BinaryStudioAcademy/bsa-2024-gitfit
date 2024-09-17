import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

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

	public constructor(contributorRepository: ContributorRepository) {
		this.contributorRepository = contributorRepository;
	}

	public async create(
		payload: ContributorCreateRequestDto,
	): Promise<ContributorGetAllItemResponseDto> {
		const { name } = payload;

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

		return item.toObject();
	}

	public async findAll(): Promise<ContributorGetAllResponseDto> {
		const contributors = await this.contributorRepository.findAll();

		return {
			items: contributors.items.map((item) => {
				const contributor = item.toObject();

				return {
					...contributor,
					gitEmails: contributor.gitEmails.map((gitEmail) => ({
						email: gitEmail.email,
						id: gitEmail.id,
					})),
				};
			}),
		};
	}

	public async findByName(
		name: string,
	): Promise<ContributorGetAllItemResponseDto | null> {
		const item = await this.contributorRepository.findByName(name);

		if (!item) {
			return null;
		}

		return item.toObject();
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ContributorService };
