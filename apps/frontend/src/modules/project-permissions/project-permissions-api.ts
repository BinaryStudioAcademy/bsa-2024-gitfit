import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ProjectPermissionsApiPath } from "./libs/enums/enums.js";
import { type ProjectPermissionsGetAllResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ProjectPermissionsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PROJECT_PERMISSIONS, storage });
	}

	public async getAll(): Promise<ProjectPermissionsGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectPermissionsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<ProjectPermissionsGetAllResponseDto>();
	}
}

export { ProjectPermissionsApi };
