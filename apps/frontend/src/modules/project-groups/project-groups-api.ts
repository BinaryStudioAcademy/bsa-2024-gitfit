import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type PaginationQueryParameters } from "~/libs/types/types.js";

import { ProjectGroupsApiPath } from "./libs/enums/enums.js";
import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupGetAllItemResponseDto,
	type ProjectGroupGetAllResponseDto,
	type ProjectGroupPatchRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ProjectGroupApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PROJECT_GROUPS, storage });
	}
	public async create(
		payload: ProjectGroupCreateRequestDto,
	): Promise<ProjectGroupGetAllItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectGroupsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ProjectGroupGetAllItemResponseDto>();
	}

	public async deleteById(id: number): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(ProjectGroupsApiPath.$ID, { id: String(id) }),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json<boolean>();
	}

	public async getAllByProjectId(
		projectId: string,
		query: PaginationQueryParameters,
	): Promise<ProjectGroupGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectGroupsApiPath.$ID, {
				id: projectId,
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: {
					page: String(query.page),
					pageSize: String(query.pageSize),
				},
			},
		);

		return await response.json<ProjectGroupGetAllResponseDto>();
	}

	public async patch(
		id: number,
		payload: ProjectGroupPatchRequestDto,
	): Promise<ProjectGroupGetAllItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ProjectGroupsApiPath.$ID, { id: String(id) }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ProjectGroupGetAllItemResponseDto>();
	}
}

export { ProjectGroupApi };
