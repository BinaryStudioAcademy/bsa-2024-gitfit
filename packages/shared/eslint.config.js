import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.FlatConfig} */
let FlatConfig;

/** @type {FlatConfig} */
const ignoresConfig = {
	ignores: ["build"],
};

/** @type {FlatConfig[]} */
const config = [...baseConfig, ignoresConfig];

export default config;
