import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ProjectsApiPath } from "./libs/enums/enums.js";
import { type ProjectGetAllResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ProjectApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PROJECTS, storage });
	}
	public async getAll(name = ""): Promise<ProjectGetAllResponseDto> {
		const endpoint = this.getFullEndpoint(ProjectsApiPath.ROOT, "?name=:name", {
			name,
		});

		const response = await this.load(endpoint, {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: "GET",
		});

		return await response.json<ProjectGetAllResponseDto>();
	}
}

export { ProjectApi };
