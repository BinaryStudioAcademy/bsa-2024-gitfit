import { type ContributorGetAllItemResponseDto } from "~/modules/contributors/contributors.js";

import { type ContributorRow } from "../types/types.js";

const getContributorRows = (
	contributors: ContributorGetAllItemResponseDto[],
): ContributorRow[] =>
	contributors.map((contributor) => ({
		gitEmails: contributor.gitEmails.map((email) => email.email),
		isHidden: contributor.isHidden,
		name: contributor.name,
		projects: contributor.projects.map((project) => project.name),
	}));

export { getContributorRows };
