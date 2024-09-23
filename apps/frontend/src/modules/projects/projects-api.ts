import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ProjectsApiPath } from "./libs/enums/enums.js";
import {
	type ProjectCreateRequestDto,
	type ProjectGetAllItemResponseDto,
	type ProjectGetAllRequestDto,
	type ProjectGetAllResponseDto,
	type ProjectGetByIdResponseDto,
	type ProjectPatchRequestDto,
	type ProjectPatchResponseDto,
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

	public async create(
		payload: ProjectCreateRequestDto,
	): Promise<ProjectGetAllItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ProjectGetAllItemResponseDto>();
	}

	public async deleteById(id: number): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(ProjectsApiPath.$ID, { id: String(id) }),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json<boolean>();
	}

	public async getAll(
		query: ProjectGetAllRequestDto,
	): Promise<ProjectGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
				query: {
					name: query.name,
					page: String(query.page),
					pageSize: String(query.pageSize),
				},
			},
		);

		return await response.json<ProjectGetAllResponseDto>();
	}

	public async getAllWithoutPagination(): Promise<
		ProjectGetAllItemResponseDto[]
	> {
		const response = await this.load(
			this.getFullEndpoint(ProjectsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<ProjectGetAllItemResponseDto[]>();
	}

	public async getById(payload: {
		id: string;
	}): Promise<ProjectGetByIdResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectsApiPath.$ID, { id: payload.id }),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<ProjectGetByIdResponseDto>();
	}

	public async patch(
		id: number,
		payload: ProjectPatchRequestDto,
	): Promise<ProjectPatchResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectsApiPath.$ID, { id: String(id) }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ProjectPatchResponseDto>();
	}
}

export { ProjectApi };
