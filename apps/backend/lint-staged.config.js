import { default as baseConfig } from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig,
	"**/*.ts": [
		() => "npm run lint:js -w apps/backend",
		() => "npm run lint:type -w apps/backend",
	],
};

export default config;
