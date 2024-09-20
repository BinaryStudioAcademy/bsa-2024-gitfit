import { type UserService } from "~/modules/users/user.service.js";

import { type ProjectApiKeyService } from "../project-api-keys/project-api-keys.js";
import { type ProjectService } from "../projects/projects.js";
import {
	type AuthAnalyticsValidateCredentialsRequestDto,
	type AuthAnalyticsValidateCredentialsResponseDto,
} from "./libs/types/types.js";

class AuthAnalyticsService {
	private projectApiKeyService: ProjectApiKeyService;

	private projectService: ProjectService;

	private userService: UserService;

	public constructor(
		projectApiKeyService: ProjectApiKeyService,
		projectService: ProjectService,
		userService: UserService,
	) {
		this.projectService = projectService;
		this.projectApiKeyService = projectApiKeyService;
		this.userService = userService;
	}

	public async validateCredentials(
		payload: { apiKey: string } & AuthAnalyticsValidateCredentialsRequestDto,
	): Promise<AuthAnalyticsValidateCredentialsResponseDto> {
		await this.userService.find(payload.userId);

		const projectApiKeyEntity = await this.projectApiKeyService.findByApiKey(
			payload.apiKey,
		);

		const project = await this.projectService.find(
			projectApiKeyEntity.projectId,
		);

		return { projectId: project.id, projectName: project.name };
	}
}

export { AuthAnalyticsService };
