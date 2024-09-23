import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type PaginationQueryParameters } from "~/libs/types/types.js";

import {
	type ContributorGetAllItemResponseDto,
	type ContributorGetAllResponseDto,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
	type ContributorPatchResponseDto,
} from "./contributors.js";
import { ContributorsApiPath } from "./libs/enums/enums.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ContributorApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.CONTRIBUTORS, storage });
	}

	public async getAll(
		query: PaginationQueryParameters,
	): Promise<ContributorGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ContributorsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
				query: {
					page: String(query.page),
					pageSize: String(query.pageSize),
				},
			},
		);

		return await response.json<ContributorGetAllResponseDto>();
	}

	public async getAllByProjectId(
		projectId: string,
	): Promise<ContributorGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ContributorsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
				query: {
					projectId,
				},
			},
		);

		return await response.json<ContributorGetAllResponseDto>();
	}

	public async merge(
		id: number,
		payload: ContributorMergeRequestDto,
	): Promise<ContributorGetAllItemResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ContributorsApiPath.MERGE_$ID, { id: String(id) }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ContributorGetAllItemResponseDto>();
	}

	public async patch(
		id: number,
		payload: ContributorPatchRequestDto,
	): Promise<ContributorPatchResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ContributorsApiPath.$ID, { id: String(id) }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<ContributorPatchResponseDto>();
	}
}

export { ContributorApi };
