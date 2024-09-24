import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import {
	type UserGetAllQueryParameters,
	type UserGetAllResponseDto,
	type UserPatchRequestDto,
	type UserPatchResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USERS, storage });
	}

	public async deleteById(id: number): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.$ID, { id: String(id) }),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json<boolean>();
	}

	public async deleteCurrentUser(): Promise<boolean> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json<boolean>();
	}

	public async getAll({
		name = "",
		page,
		pageSize,
	}: UserGetAllQueryParameters): Promise<UserGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
				query: {
					name,
					page: String(page),
					pageSize: String(pageSize),
				},
			},
		);

		return await response.json<UserGetAllResponseDto>();
	}

	public async patch(
		id: number,
		payload: UserPatchRequestDto,
	): Promise<UserPatchResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.$ID, { id: String(id) }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserPatchResponseDto>();
	}

	public async patchCurrentUser(
		payload: UserPatchRequestDto,
	): Promise<UserPatchResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(UsersApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<UserPatchResponseDto>();
	}
}

export { UserApi };
