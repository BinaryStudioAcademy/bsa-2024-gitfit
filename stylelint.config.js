/** @type {import('stylelint').Config} */
const config = {
	extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
	rules: {
		"color-hex-length": "long",
		"declaration-no-important": true,
		"max-nesting-depth": 0,
		"no-descending-specificity": true,
		"selector-class-pattern": null,
		"selector-pseudo-class-no-unknown": [
			true,
			{
				ignorePseudoClasses: ["global"],
			},
		],
		"unit-disallowed-list": ["em", "rem"],
	},
};

export default config;
