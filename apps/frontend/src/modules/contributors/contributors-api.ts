import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { ContributorsApiPath } from "./libs/enums/enums.js";
import { type ContributorGetAllResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ContributorApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.CONTRIBUTORS, storage });
	}

	public async getAll(): Promise<ContributorGetAllResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(ContributorsApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
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
}

export { ContributorApi };
