import { default as baseConfig } from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig,
	"**/*.ts": [
		() => "npm run lint:js -w packages/shared",
		() => "npm run lint:type -w packages/shared",
	],
};

export default config;
