import { ServerErrorType } from "~/libs/enums/enums.js";
import {
	configureQueryString,
	configureString,
} from "~/libs/helpers/helpers.js";
import {
	type HTTP,
	HTTPCode,
	HTTPError,
	HTTPHeader,
	UnauthorizedError,
} from "~/libs/modules/http/http.js";
import { type Storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { type ServerErrorResponse, type ValueOf } from "~/libs/types/types.js";

import {
	type GetHeadersOptions,
	type HTTPApi,
	type HTTPApiOptions,
	type HTTPApiResponse,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	path: string;
	storage: Storage;
};

class BaseHTTPApi implements HTTPApi {
	private baseUrl: string;

	private http: HTTP;

	private path: string;

	private storage: Storage;

	public constructor({ baseUrl, http, path, storage }: Constructor) {
		this.baseUrl = baseUrl;
		this.http = http;
		this.path = path;
		this.storage = storage;
	}

	protected getFullEndpoint<T extends Record<string, string>>(
		...parameters: [...string[], T]
	): string {
		const copiedParameters = [...parameters];

		const options = copiedParameters.pop() as T;

		return configureString(
			this.baseUrl,
			this.path,
			...(copiedParameters as string[]),
			options,
		);
	}

	private async checkResponse(response: Response): Promise<Response> {
		if (!response.ok) {
			await this.handleError(response);
		}

		return response;
	}

	private async getHeaders({
		contentType,
		hasAuth,
	}: GetHeadersOptions): Promise<Headers> {
		const headers = new Headers();

		if (contentType) {
			headers.append(HTTPHeader.CONTENT_TYPE, contentType);
		}

		if (hasAuth) {
			const token = await this.storage.get<string>(StorageKey.TOKEN);

			headers.append(HTTPHeader.AUTHORIZATION, `Bearer ${token as string}`);
		}

		return headers;
	}

	private async handleError(response: Response): Promise<never> {
		let parsedException: ServerErrorResponse;

		try {
			parsedException = (await response.json()) as ServerErrorResponse;
		} catch {
			parsedException = {
				errorType: ServerErrorType.COMMON,
				message: response.statusText,
			};
		}

		const isCustomException = Boolean(parsedException.errorType);

		if (response.status === HTTPCode.UNAUTHORIZED) {
			throw new UnauthorizedError({
				details: "details" in parsedException ? parsedException.details : [],
				message: parsedException.message,
			});
		}

		throw new HTTPError({
			details: "details" in parsedException ? parsedException.details : [],
			errorType: isCustomException
				? parsedException.errorType
				: ServerErrorType.COMMON,
			message: parsedException.message,
			status: response.status as ValueOf<typeof HTTPCode>,
		});
	}

	public async load(
		path: string,
		options: HTTPApiOptions,
	): Promise<HTTPApiResponse> {
		const {
			contentType = null,
			hasAuth = false,
			method,
			payload = null,
			query,
		} = options;

		const headers = await this.getHeaders({
			contentType,
			hasAuth,
		});

		const url = configureQueryString(path, query);

		const response = await this.http.load(url, {
			headers,
			method,
			payload,
		});

		return (await this.checkResponse(response)) as HTTPApiResponse;
	}
}

export { BaseHTTPApi };
