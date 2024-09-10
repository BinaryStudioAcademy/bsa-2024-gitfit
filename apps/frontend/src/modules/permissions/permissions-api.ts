import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { PermissionsApiPath } from "./libs/enums/enums.js";
import { type PermissionGetAllResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PermissionApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.PERMISSIONS, storage });
	}

	public async getAll(): Promise<PermissionGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(PermissionsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json<PermissionGetAllResponseDto>();
	}
}

export { PermissionApi };
