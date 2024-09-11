import { type Service } from "~/libs/types/types.js";
import { type ContributorService } from "~/modules/contributors/contributors.js";
import { type GitEmailService } from "~/modules/git-emails/git-emails.js";
import { type ProjectApiKeyService } from "~/modules/project-api-keys/project-api-keys.js";

import { ActivityLogEntity } from "./activity-log.entity.js";
import { type ActivityLogRepository } from "./activity-log.repository.js";
import {
	type ActivityLogCreateRequestDto,
	type ActivityLogGetAllResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	activityLogRepository: ActivityLogRepository;
	contributorService: ContributorService;
	gitEmailService: GitEmailService;
	projectApiKeyService: ProjectApiKeyService;
};

class ActivityLogService implements Service {
	private activityLogRepository: ActivityLogRepository;
	private contributorService: ContributorService;
	private gitEmailService: GitEmailService;
	private projectApiKeyService: ProjectApiKeyService;

	public constructor({
		activityLogRepository,
		contributorService,
		gitEmailService,
		projectApiKeyService,
	}: Constructor) {
		this.activityLogRepository = activityLogRepository;
		this.contributorService = contributorService;
		this.gitEmailService = gitEmailService;
		this.projectApiKeyService = projectApiKeyService;
	}

	public async create(
		payload: { apiKey: string } & ActivityLogCreateRequestDto,
	): Promise<ActivityLogGetAllResponseDto> {
		// TODO: retrieve token from auth headers
		const { apiKey, items, userId } = payload;

		const existingProjectApiKey =
			await this.projectApiKeyService.findByApiKey(apiKey);

		const { projectId } = existingProjectApiKey;

		const createdActivityLogs: ActivityLogGetAllResponseDto = {
			items: [],
		};

		for (const record of items) {
			const { date, items } = record;

			for (const logItem of items) {
				const { authorEmail, authorName, commitsNumber } = logItem;

				let contributor = await this.contributorService.findByName(authorName);

				if (!contributor) {
					contributor = await this.contributorService.create({
						name: authorName,
					});
				}

				let gitEmail = await this.gitEmailService.findByEmail(authorEmail);

				if (!gitEmail) {
					gitEmail = await this.gitEmailService.create({
						contributorId: contributor.id,
						email: authorEmail,
					});
				}

				const activityLog = await this.activityLogRepository.create(
					ActivityLogEntity.initializeNew({
						commitsNumber,
						contributor: { id: contributor.id, name: contributor.name },
						createdByUser: { id: userId },
						date,
						gitEmail: { id: gitEmail.id },
						project: { id: projectId },
					}),
				);

				createdActivityLogs.items.push(activityLog.toObject());
			}
		}

		return createdActivityLogs;
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Service["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<ActivityLogGetAllResponseDto> {
		const activityLogs = await this.activityLogRepository.findAll();

		return {
			items: activityLogs.items.map((item) => item.toObject()),
		};
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}
}

export { ActivityLogService };
