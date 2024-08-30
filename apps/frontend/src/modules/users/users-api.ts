import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import {
	type PaginationParameters,
	type UserGetAllResponseDto,
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

	public async getAll({
		page,
		pageSize,
	}: PaginationParameters): Promise<UserGetAllResponseDto> {
		const end = this.getFullEndpoint(
			UsersApiPath.ROOT,
			"?page=:page&pageSize=:pageSize",
			{
				page: String(page),
				pageSize: String(pageSize),
			},
		);
		const response = await this.load(end, {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: "GET",
		});

		return await response.json<UserGetAllResponseDto>();
	}
}

export { UserApi };
