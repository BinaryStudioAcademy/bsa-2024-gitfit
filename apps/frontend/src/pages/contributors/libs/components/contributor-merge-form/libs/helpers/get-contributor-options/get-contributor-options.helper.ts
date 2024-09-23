import { type SelectOption } from "~/libs/types/select-option.type.js";
import { type ContributorGetAllItemResponseDto } from "~/modules/contributors/contributors.js";

const getContributorOptions = (
	contributors: ContributorGetAllItemResponseDto[],
): SelectOption<number>[] =>
	contributors.map((contributor) => ({
		label: `${contributor.name} (${contributor.gitEmails.map((email) => email.email).join(", ")})`,
		value: contributor.id,
	}));

export { getContributorOptions };
