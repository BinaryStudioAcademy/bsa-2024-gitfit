import { danger, fail, type GitHubPRDSL as LibraryGitHubDSL } from "danger";

import { ProjectPrefix } from "./project.config";

const LABELS_EMPTY_LENGTH = 0;

type GitHubPRDSL = {
	labels: unknown[];
	milestone: null | Record<string, unknown>;
	project_id: null | string;
} & LibraryGitHubDSL;

type DangerConfig = {
	ASSIGNEES: {
		IS_REQUIRED: boolean;
	};
	BRANCH: {
		PATTERN: null | RegExp;
	};
	LABELS: {
		IS_REQUIRED: boolean;
	};
	MILESTONE: {
		IS_REQUIRED: boolean;
	};
	TITLE: {
		PATTERN: null | RegExp;
	};
};

const config: DangerConfig = {
	ASSIGNEES: {
		IS_REQUIRED: true,
	},
	BRANCH: {
		PATTERN: new RegExp(
			`^[0-9]{1,6}-${ProjectPrefix.CHANGE_TYPES.join("|")}-[a-zA-Z0-9-]+$|(${ProjectPrefix.ENVIRONMENT})$`,
		),
	},
	LABELS: {
		IS_REQUIRED: true,
	},
	MILESTONE: {
		IS_REQUIRED: true,
	},
	TITLE: {
		PATTERN: new RegExp(
			`^(${ProjectPrefix.CHANGE_TYPES.join("|")})(\\((${ProjectPrefix.SCOPES.APPS.join("|")}|${ProjectPrefix.SCOPES.PACKAGES.join("|")})(\\/(${ProjectPrefix.SCOPES.APPS.join("|")}|${ProjectPrefix.SCOPES.PACKAGES.join("|")}))*\\))?: (.*\\S )?(${ProjectPrefix.ISSUE_PREFIXES.join("|")})-[0-9]{1,6}((\\.[0-9]+){1,2})?$`,
		),
	},
};

const pr = danger.github.pr as GitHubPRDSL;

const checkAssignees = (): void => {
	const hasAssignees = Boolean(pr.assignee);

	if (!hasAssignees) {
		fail("This pull request should have at least one assignee.");
	}
};

const checkTitle = (titlePattern: RegExp): void => {
	const isTitleValid = titlePattern.test(pr.title);

	if (!isTitleValid) {
		fail(
			`The pull request title should match the following pattern: ${String(
				titlePattern,
			)}.`,
		);
	}
};

const checkMilestone = (): void => {
	const hasMilestone = Boolean(pr.milestone);

	if (!hasMilestone) {
		fail("This pull request should have a milestone.");
	}
};

const checkLabels = (): void => {
	const hasLabels = pr.labels.length > LABELS_EMPTY_LENGTH;

	if (!hasLabels) {
		fail("This pull request should have at least one label.");
	}
};

const checkBranch = (branchPattern: RegExp): void => {
	const isBranchValid = branchPattern.test(pr.head.ref);

	if (!isBranchValid) {
		fail(
			`The pull request branch should match the following pattern: ${String(
				branchPattern,
			)}.`,
		);
	}
};

const applyDanger = (): void => {
	if (config.TITLE.PATTERN) {
		checkTitle(config.TITLE.PATTERN);
	}

	if (config.ASSIGNEES.IS_REQUIRED) {
		checkAssignees();
	}

	if (config.MILESTONE.IS_REQUIRED) {
		checkMilestone();
	}

	if (config.LABELS.IS_REQUIRED) {
		checkLabels();
	}

	if (config.BRANCH.PATTERN) {
		checkBranch(config.BRANCH.PATTERN);
	}
};

applyDanger();
