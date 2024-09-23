import { logger } from "~/libs/modules/logger/logger.js";

import { type authAnalyticsApi } from "./auth-analytics.js";
import { type AuthAnalyticsValidateCredentialsResponseDto } from "./libs/types/types.js";

type Constructor = {
	authAnalyticsApi: typeof authAnalyticsApi;
};

class AuthAnalyticsService {
	private authAnalyticsApi: typeof authAnalyticsApi;

	public constructor({ authAnalyticsApi }: Constructor) {
		this.authAnalyticsApi = authAnalyticsApi;
	}

	public async validateCredentials(
		apiKey: string,
		userId: number,
	): Promise<AuthAnalyticsValidateCredentialsResponseDto | null> {
		try {
			const payload = {
				userId: Number(userId),
			};

			const response = await this.authAnalyticsApi.validateCredentials(
				apiKey,
				payload,
			);

			logger.info(
				`Credentials validated: Project ID: ${response.projectId.toString()}, Project Name: ${response.projectName}.`,
			);

			return {
				projectId: response.projectId,
				projectName: response.projectName,
			};
		} catch (error: unknown) {
			if (error instanceof Error) {
				logger.error(`Error validating credentials: ${error.message}`);
			} else {
				logger.error(`Error validating credentials: ${String(error)}`);
			}

			return null;
		}
	}
}

export { AuthAnalyticsService };
