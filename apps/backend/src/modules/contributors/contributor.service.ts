import { MIN_GIT_EMAILS_LENGTH_FOR_SPLIT } from "~/libs/constants/constants.js";
import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { ContributorEntity } from "./contributor.entity.js";
import { type ContributorRepository } from "./contributor.repository.js";
import { ContributorError } from "./libs/exceptions/exceptions.js";
import {
	type ContributorCreateRequestDto,
	type ContributorGetAllItemResponseDto,
	type ContributorGetAllQueryParameters,
	type ContributorGetAllResponseDto,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
	type ContributorPatchResponseDto,
	type ContributorSplitRequestDto,
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

	public async findAll(
		query: {
			permittedProjectIds?: number[] | undefined;
		} & ContributorGetAllQueryParameters,
	): Promise<ContributorGetAllResponseDto> {
		const contributors = await this.contributorRepository.findAll(query);

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
			totalItems: contributors.totalItems,
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

	public async merge(
		currentContributorId: number,
		{ selectedContributorId }: ContributorMergeRequestDto,
	): Promise<ContributorGetAllItemResponseDto | null> {
		if (currentContributorId === selectedContributorId) {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_SELF_MERGE,
				status: HTTPCode.CONFLICT,
			});
		}

		const currentContributor =
			await this.contributorRepository.find(currentContributorId);
		const selectedContributor = await this.contributorRepository.find(
			selectedContributorId,
		);

		if (!currentContributor || !selectedContributor) {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		try {
			const mergedContributor = await this.contributorRepository.merge(
				currentContributorId,
				{
					selectedContributorId,
				},
			);

			if (!mergedContributor) {
				return null;
			}

			return mergedContributor.toObject();
		} catch {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_MERGE_FAILED,
				status: HTTPCode.CONFLICT,
			});
		}
	}

	public async patch(
		contributorId: number,
		data: ContributorPatchRequestDto,
	): Promise<ContributorPatchResponseDto | null> {
		const item = await this.contributorRepository.patch(contributorId, data);

		if (!item) {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return item.toObject();
	}

	public async split(
		contributorId: number,
		payload: ContributorSplitRequestDto,
	): Promise<ContributorGetAllItemResponseDto | null> {
		const currentContributorEntity =
			await this.contributorRepository.find(contributorId);
		const hasContributor = currentContributorEntity !== null;

		if (!hasContributor) {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const currentContributor = currentContributorEntity.toObject();

		if (
			currentContributor.gitEmails.length <= MIN_GIT_EMAILS_LENGTH_FOR_SPLIT
		) {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_SPLIT_SINGLE_EMAIL,
				status: HTTPCode.CONFLICT,
			});
		}

		const splitEmail = currentContributor.gitEmails.find(
			({ id }) => id === payload.gitEmailId,
		);
		const hasSplittedEmail = splitEmail !== undefined;

		if (!hasSplittedEmail) {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_SPLIT_FAILED,
				status: HTTPCode.CONFLICT,
			});
		}

		try {
			const splitContributor = await this.contributorRepository.split(
				payload.gitEmailId,
				payload.newContributorName,
			);

			return splitContributor.toObject();
		} catch {
			throw new ContributorError({
				message: ExceptionMessage.CONTRIBUTOR_SPLIT_FAILED,
				status: HTTPCode.CONFLICT,
			});
		}
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ContributorService };
