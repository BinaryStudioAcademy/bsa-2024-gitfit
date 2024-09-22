import { type ContributorSplitRequestDto } from "~/modules/contributors/contributors.js";

const DEFAULT_CONTRIBUTOR_SPLIT_PAYLOAD: Pick<
	ContributorSplitRequestDto,
	"newContributorName"
> = {
	newContributorName: "",
};

export { DEFAULT_CONTRIBUTOR_SPLIT_PAYLOAD };
