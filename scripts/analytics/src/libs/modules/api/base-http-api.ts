import { ServerErrorType } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import {
	type HTTP,
	type HTTPCode,
	HTTPError,
	HTTPHeader,
} from "~/libs/modules/http/http.js";
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
	serverUrl: string;
};

class BaseHTTPApi implements HTTPApi {
	private baseUrl: string;

	private http: HTTP;

	private path: string;

	private serverUrl: string;

	public constructor({ baseUrl, http, path, serverUrl }: Constructor) {
		this.serverUrl = serverUrl;
		this.baseUrl = baseUrl;
		this.http = http;
		this.path = path;
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

	private getHeaders({
		contentType,
		hasAuth,
		token,
	}: GetHeadersOptions): Headers {
		const headers = new Headers();

		if (contentType) {
			headers.append(HTTPHeader.CONTENT_TYPE, contentType);
		}

		if (hasAuth) {
			headers.append(HTTPHeader.AUTHORIZATION, `Bearer ${token as string}`);
		}

		return headers;
	}

	private getUrl(
		path: string,
		query?: ConstructorParameters<typeof URLSearchParams>[number],
	): string {
		if (!query) {
			return `${this.serverUrl}${path}`;
		}

		const queryParameters = new URLSearchParams(query);

		return `${this.serverUrl}${path}?${queryParameters.toString()}`;
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
			token,
		} = options;

		const headers = this.getHeaders({
			contentType,
			hasAuth,
			token,
		});

		const url = this.getUrl(path, query);

		const response = await this.http.load(url, {
			headers,
			method,
			payload,
		});

		return (await this.checkResponse(response)) as HTTPApiResponse;
	}
}

export { BaseHTTPApi };
