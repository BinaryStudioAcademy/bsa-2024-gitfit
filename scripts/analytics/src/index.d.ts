declare module "forever" {
	function startDaemon(
		script: string,
		options?: {
			args?: string[];
			errFile?: string;
			outFile?: string;
			silent?: boolean;
		},
	): void;
}
