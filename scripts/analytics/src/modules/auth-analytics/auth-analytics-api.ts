import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";

import { AuthAnalyticsApiPath } from "./libs/enums/enums.js";
import {
	type AuthAnalyticsValidateCredentialsRequestDto,
	type AuthAnalyticsValidateCredentialsResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	serverUrl: string;
};

class AuthAnalyticsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, serverUrl }: Constructor) {
		super({ baseUrl, http, path: APIPath.AUTH_ANALYTICS, serverUrl });
	}

	public async validateCredentials(
		authToken: string,
		payload: AuthAnalyticsValidateCredentialsRequestDto,
	): Promise<AuthAnalyticsValidateCredentialsResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(AuthAnalyticsApiPath.ROOT, {}),
			{
				authToken,
				contentType: ContentType.JSON,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<AuthAnalyticsValidateCredentialsResponseDto>();
	}
}

export { AuthAnalyticsApi };
