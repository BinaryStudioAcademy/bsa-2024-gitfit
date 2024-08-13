import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.FlatConfig} */
let FlatConfig;
/** @typedef {import('eslint').Linter.RulesRecord} */
let RulesRecord;
/** @typedef {import('eslint').ESLint.Plugin} */
let Plugin;

/** @type {FlatConfig} */
const ignoresConfig = {
	ignores: ["build"],
};

/** @type {FlatConfig} */
const mainConfig = {
	languageOptions: {
		globals: {
			...globals.node,
			...globals.browser,
			JSX: true,
			React: true,
		},
	},
};

/** @type {FlatConfig} */
const reactConfig = {
	files: ["**/*.tsx"],
	plugins: {
		react: /** @type {Plugin} */ (reactPlugin),
	},
	rules: /** @type {RulesRecord} */ ({
		...reactPlugin.configs["jsx-runtime"].rules,
		...reactPlugin.configs["recommended"].rules,
		"react/jsx-boolean-value": ["error"],
		"react/jsx-curly-brace-presence": ["error"],
		"react/jsx-no-bind": ["error", { ignoreRefs: true }],
		"react/prop-types": ["off"],
		"react/self-closing-comp": ["error"],
	}),
	settings: {
		react: {
			version: "detect",
		},
	},
};

/** @type {FlatConfig} */
const reactHooksConfig = {
	files: ["**/*.tsx"],
	plugins: {
		"react-hooks": /** @type {Plugin} */ (reactHooksPlugin),
	},
	rules: /** @type {RulesRecord} */ (
		reactHooksPlugin.configs.recommended.rules
	),
};

/** @type {FlatConfig} */
const jsxA11yConfig = {
	files: ["**/*.tsx"],
	plugins: {
		"jsx-a11y": jsxA11yPlugin,
	},
	rules: jsxA11yPlugin.configs.recommended.rules,
};

/** @type {FlatConfig} */
const explicitGenericsConfig = {
	rules: {
		"require-explicit-generics/require-explicit-generics": [
			"error",
			["useState"],
		],
	},
};

/** @type {FlatConfig[]} */
const overridesConfigs = [
	{
		files: ["vite.config.ts"],
		rules: {
			"import/no-default-export": ["off"],
		},
	},
	{
		files: ["src/vite-env.d.ts"],
		rules: {
			"unicorn/prevent-abbreviations": ["off"],
		},
	},
];

/** @type {FlatConfig[]} */
const config = [
	...baseConfig,
	ignoresConfig,
	mainConfig,
	reactConfig,
	reactHooksConfig,
	jsxA11yConfig,
	explicitGenericsConfig,
	...overridesConfigs,
];

export default config;
