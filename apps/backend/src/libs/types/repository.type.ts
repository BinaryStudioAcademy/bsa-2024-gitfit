type Repository<T = unknown> = {
	create(payload: unknown): Promise<T>;
	delete(id: number): Promise<boolean>;
	find(id: number): Promise<null | T>;
	findAll(page: number, size: number): Promise<T[]>;
	update(id: number, payload: unknown): Promise<null | T>;
};

export { type Repository };
