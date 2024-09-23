import { type SelectOption } from "~/libs/types/select-option.type.js";
import { type ContributorGetAllItemResponseDto } from "~/modules/contributors/contributors.js";

const getGitEmailOptions = (
	contributor: ContributorGetAllItemResponseDto,
): SelectOption<number>[] =>
	contributor.gitEmails.map(({ email, id }) => ({
		label: email,
		value: id,
	}));

export { getGitEmailOptions };
