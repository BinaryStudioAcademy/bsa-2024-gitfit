import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type PaginationQueryParameters } from "~/libs/types/types.js";

import { GroupsApiPath } from "./libs/enums/enums.js";
import {
	type GroupCreateRequestDto,
	type GroupCreateResponseDto,
	type GroupGetAllResponseDto,
	type GroupUpdateRequestDto,
	type GroupUpdateResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class GroupApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.GROUPS, storage });
	}

	public async create(
		payload: GroupCreateRequestDto,
	): Promise<GroupCreateResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<GroupCreateResponseDto>();
	}

	public async deleteById(id: number): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.$ID, { id: String(id) }),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json<boolean>();
	}

	public async getAll(
		query: PaginationQueryParameters,
	): Promise<GroupGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
				query: {
					page: String(query.page),
					pageSize: String(query.pageSize),
				},
			},
		);

		return await response.json<GroupGetAllResponseDto>();
	}

	public async update(
		id: number,
		payload: GroupUpdateRequestDto,
	): Promise<GroupUpdateResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(GroupsApiPath.$ID, { id: String(id) }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PUT",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<GroupUpdateResponseDto>();
	}
}

export { GroupApi };
