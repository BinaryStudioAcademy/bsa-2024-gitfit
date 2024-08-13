type Storage = {
	drop(key: string): Promise<void>;
	get<R>(key: string): Promise<null | R>;
	has(key: string): Promise<boolean>;
	set(key: string, value: unknown): Promise<void>;
};

export { type Storage };
