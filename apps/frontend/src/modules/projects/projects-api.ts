import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ProjectsApiPath } from "./libs/enums/enums.js";
import {
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllResponseDto,
	type ProjectGetByIdRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ProjectApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PROJECTS, storage });
	}

	public async getAll(): Promise<ProjectGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<ProjectGetAllResponseDto>();
	}

	public async getById(
		payload: ProjectGetByIdRequestDto,
	): Promise<ProjectGetAllItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectsApiPath.$ID, { id: payload.id }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<ProjectGetAllItemResponseDto>();
	}
}

export { ProjectApi };
