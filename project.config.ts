const ProjectPrefix = {
	CHANGE_TYPES: [
		"build",
		"chore",
		"ci",
		"docs",
		"feat",
		"fix",
		"perf",
		"refactor",
		"revert",
		"style",
		"test",
	],
	ENVIRONMENT: "main",
	ISSUE_PREFIXES: ["gf", "release"],
	SCOPES: {
		APPS: ["frontend", "backend"],
		PACKAGES: ["shared"],
		SCRIPTS: ["analytics"],
	},
} as const;

export { ProjectPrefix };
