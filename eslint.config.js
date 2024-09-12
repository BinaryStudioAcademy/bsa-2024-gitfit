import jsPlugin from "@eslint/js";
import stylistiPlugin from "@stylistic/eslint-plugin";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { resolve as tsResolver } from "eslint-import-resolver-typescript";
import * as importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import explicitGenericsPlugin from "eslint-plugin-require-explicit-generics";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";

const JS_MAX_PARAMS_ALLOWED = 3;

/** @typedef {import("eslint").Linter.FlatConfig} */
let FlatConfig;
/** @typedef {import('eslint').ESLint.Plugin} */
let Plugin;

/** @type {FlatConfig} */
const filesConfig = {
	files: ["**/*.{js,ts,tsx}"],
};

/** @type {FlatConfig} */
const ignoresConfig = {
	ignores: ["apps", "packages", "scripts", "dangerfile.ts"],
};

/** @type {FlatConfig} */
const jsConfig = {
	languageOptions: {
		globals: globals.node,
		parserOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
	},
	rules: {
		...jsPlugin.configs.recommended.rules,
		"arrow-parens": ["error", "always"],
		curly: ["error", "all"],
		eqeqeq: ["error", "always"],
		"max-params": ["error", JS_MAX_PARAMS_ALLOWED],
		"no-console": ["error"],
		"no-multiple-empty-lines": [
			"error",
			{
				max: 1,
			},
		],
		"no-restricted-syntax": [
			"error",
			{
				message: "Export/Import all (*) is forbidden.",
				selector: "ExportAllDeclaration,ImportAllDeclaration",
			},
			{
				message: "Exports should be at the end of the file.",
				selector: "ExportNamedDeclaration[declaration!=null]",
			},
			{
				message: "TS features are forbidden.",
				selector: "TSEnumDeclaration,ClassDeclaration[abstract=true]",
			},
			{
				message:
					"Avoid import/export type { Type } from './module'. Prefer import/export { type Type } from './module'.",
				selector:
					"ImportDeclaration[importKind=type],ExportNamedDeclaration[exportKind=type]",
			},
		],
		"object-shorthand": ["error"],
		"prefer-destructuring": ["error"],
		quotes: ["error", "double"],
	},
};

/** @type {FlatConfig} */
const importConfig = {
	plugins: {
		import: /** @type {Plugin} */ (importPlugin),
	},
	rules: {
		...importPlugin.configs.recommended.rules,
		"import/exports-last": ["error"],
		"import/extensions": [
			"error",
			{
				js: "always",
			},
		],
		"import/newline-after-import": ["error"],
		"import/no-default-export": ["error"],
		"import/no-duplicates": ["error"],
	},
	settings: {
		"import/parsers": {
			espree: [".js", ".cjs"],
		},
		"import/resolver": {
			typescript: tsResolver,
		},
	},
};

/** @type {FlatConfig} */
const sonarConfig = {
	plugins: {
		sonarjs: /** @type {Plugin} */ (/** @type {unknown} */ (sonarjsPlugin)),
	},
	rules: {
		...sonarjsPlugin.configs.recommended.rules,
		"sonarjs/no-duplicate-string": ["off"],
	},
};

/** @type {FlatConfig} */
const unicornConfig = {
	plugins: {
		unicorn: unicornPlugin,
	},
	rules: {
		...unicornPlugin.configs.recommended.rules,
		"unicorn/no-null": ["off"],
	},
};

/** @type {FlatConfig} */
const perfectionistConfig = {
	plugins: {
		perfectionist: /** @type {Plugin} */ (
			/** @type {unknown} */ (perfectionistPlugin)
		),
	},
	rules: perfectionistPlugin.configs["recommended-natural"].rules,
};

/** @type {FlatConfig} */
const stylisticConfig = {
	plugins: {
		"@stylistic/js": /** @type {Plugin} */ (stylistiPlugin),
	},
	rules: {
		"@stylistic/js/padding-line-between-statements": [
			"error",
			{
				blankLine: "never",
				next: "export",
				prev: "export",
			},
			{
				blankLine: "always",
				next: "*",
				prev: ["block-like", "throw", "type"],
			},
			{
				blankLine: "always",
				next: ["return", "block-like", "throw", "type"],
				prev: "*",
			},
		],
	},
};

/** @type {FlatConfig} */
const typescriptConfig = {
	ignores: ["eslint.config.js", "lint-staged.config.js", "stylelint.config.js"],
	languageOptions: {
		parser: tsParser,
		parserOptions: {
			project: "./tsconfig.json",
		},
	},
	plugins: {
		"@typescript-eslint": /** @type {Plugin} */ (
			/** @type {unknown} */ (tsPlugin)
		),
	},
	rules: {
		...tsPlugin.configs["strict-type-checked"].rules,
		"@typescript-eslint/consistent-type-exports": ["error"],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{
				allowTypedFunctionExpressions: true,
			},
		],
		"@typescript-eslint/explicit-member-accessibility": ["error"],
		"@typescript-eslint/no-magic-numbers": [
			"error",
			{
				ignoreEnums: true,
				ignoreReadonlyClassProperties: true,
			},
		],
		"@typescript-eslint/return-await": ["error", "always"],
	},
};

/** @type {FlatConfig} */
const jsdocConfig = {
	files: ["eslint.config.js", "lint-staged.config.js", "stylelint.config.js"],
	plugins: {
		jsdoc: jsdocPlugin,
	},
	rules: {
		...jsdocPlugin.configs["recommended-typescript-flavor-error"].rules,
		"jsdoc/no-undefined-types": ["error"],
		"jsdoc/require-returns-description": ["off"],
	},
};

/** @type {FlatConfig} */
const explicitGenericsConfig = {
	plugins: {
		"require-explicit-generics": /** @type {Plugin} */ (explicitGenericsPlugin),
	},
};

/** @type {FlatConfig[]} */
const overridesConfigs = [
	{
		files: [
			"commitlint.config.ts",
			"prettier.config.ts",
			"stylelint.config.js",
			"knip.config.ts",
			"lint-staged.config.js",
			"eslint.config.js",
		],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
	{
		files: ["*.js"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": ["off"],
		},
	},
];

/** @type {FlatConfig[]} */
const config = [
	filesConfig,
	ignoresConfig,
	jsConfig,
	importConfig,
	sonarConfig,
	unicornConfig,
	perfectionistConfig,
	stylisticConfig,
	typescriptConfig,
	jsdocConfig,
	explicitGenericsConfig,
	...overridesConfigs,
];

export default config;
