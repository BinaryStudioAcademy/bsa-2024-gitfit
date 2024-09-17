import { default as baseConfig } from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig,
	"**/*.ts": [
		() => "npm run lint:js -w scripts/analytics",
		() => "npm run lint:type -w scripts/analytics",
	],
};

export default config;
