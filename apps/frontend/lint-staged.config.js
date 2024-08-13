import { default as baseConfig } from "../../lint-staged.config.js";

/** @type {import('lint-staged').Config} */
const config = {
	...baseConfig,
	"**/*.{ts,tsx}": [
		() => "npm run lint:js -w apps/frontend",
		() => "npm run lint:type -w apps/frontend",
	],
	"**/*.css": [() => "npm run lint:css -w apps/frontend"],
};

export default config;
