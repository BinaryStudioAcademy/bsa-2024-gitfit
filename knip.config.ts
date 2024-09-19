import { type KnipConfig } from "knip";

const config: KnipConfig = {
	prettier: ["./prettier.config.ts"],
	stylelint: ["./stylelint.config.js"],
	workspaces: {
		".": {
			entry: ["./dangerfile.ts"],
		},
		"apps/backend": {
			entry: ["src/index.ts", "src/db/migrations/*.ts", "knexfile.ts"],
			ignoreDependencies: ["pg"],
		},
		"apps/frontend": {
			entry: ["src/index.tsx"],
		},
		"packages/shared": {
			entry: ["build/index.js"],
			ignore: ["src/**/**"],
			includeEntryExports: true,
		},
		"scripts/analytics": {
			entry: [
				"src/index.ts",
				"src/libs/modules/analytics-cli/init-analytics-cli.ts",
			],
		},
	},
};

export default config;
