import { type PaginationParameters } from "~/libs/types/types.js";

type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(id: number): Promise<boolean>;
	find(id: number): Promise<null | T>;
	findAll(parameters: PaginationParameters): Promise<T[]>;
	update(id: number, payload: unknown): Promise<null | T>;
};

export { type Repository };
