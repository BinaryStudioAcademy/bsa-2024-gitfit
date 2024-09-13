import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ProjectApiKeysApiPath } from "./libs/enums/enums.js";
import {
	type ProjectApiKeyCreateRequestDto,
	type ProjectApiKeyCreateResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ProjectApiKeysApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PROJECT_API_KEYS, storage });
	}

	public async create(
		payload: ProjectApiKeyCreateRequestDto,
	): Promise<ProjectApiKeyCreateResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectApiKeysApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ProjectApiKeyCreateResponseDto>();
	}
}

export { ProjectApiKeysApi };
