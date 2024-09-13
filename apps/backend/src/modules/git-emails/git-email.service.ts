import { ExceptionMessage } from "~/libs/enums/enums.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { GitEmailEntity } from "./git-email.entity.js";
import { type GitEmailRepository } from "./git-email.repository.js";
import { GitEmailError } from "./libs/exceptions/exceptions.js";
import {
	type GitEmailCreateRequestDto,
	type GitEmailGetAllItemResponseDto,
} from "./libs/types/types.js";

class GitEmailService implements Service {
	private gitEmailRepository: GitEmailRepository;

	public constructor(gitEmailRepository: GitEmailRepository) {
		this.gitEmailRepository = gitEmailRepository;
	}

	public async create(
		payload: GitEmailCreateRequestDto,
	): Promise<GitEmailGetAllItemResponseDto> {
		const { contributorId, email } = payload;

		const existingGitEmail = await this.gitEmailRepository.findByEmail(email);

		if (existingGitEmail) {
			throw new GitEmailError({
				message: ExceptionMessage.GIT_EMAIL_USED,
				status: HTTPCode.CONFLICT,
			});
		}

		const item = await this.gitEmailRepository.create(
			GitEmailEntity.initializeNew({
				contributorId,
				email,
			}),
		);

		return item.toObject();
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

	public async findByEmail(
		email: string,
	): Promise<GitEmailGetAllItemResponseDto | null> {
		const item = await this.gitEmailRepository.findByEmail(email);

		return item ? item.toObject() : null;
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { GitEmailService };
