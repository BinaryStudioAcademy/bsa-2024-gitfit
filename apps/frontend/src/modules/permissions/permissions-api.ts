import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { AuthApiPath } from "./libs/enums/enums.js";
import { type UserGetPermissionItemResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PermissonsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.AUTH, storage });
	}

	public async getPermissions(): Promise<UserGetPermissionItemResponseDto[]> {
		const response = await this.load(
			this.getFullEndpoint(AuthApiPath.PERMISSIONS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<UserGetPermissionItemResponseDto[]>();
	}
}

export { PermissonsApi };
