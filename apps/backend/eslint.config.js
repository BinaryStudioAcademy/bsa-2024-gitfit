import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.FlatConfig} */
let FlatConfig;

/** @type {FlatConfig} */
const ignoresConfig = {
	ignores: ["build"],
};

/** @type {FlatConfig[]} */
const overridesConfigs = [
	{
		files: ["knexfile.ts"],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
	{
		files: ["src/db/migrations/**/*.ts"],
		rules: {
			"unicorn/filename-case": [
				"error",
				{
					case: "snakeCase",
				},
			],
		},
	},
	{
		files: ["src/libs/modules/controller/base-controller.module.ts"],
		rules: {
			"@typescript-eslint/no-magic-numbers": ["off"],
		},
	},
];

/** @type {FlatConfig[]} */
const config = [...baseConfig, ignoresConfig, ...overridesConfigs];

export default config;
