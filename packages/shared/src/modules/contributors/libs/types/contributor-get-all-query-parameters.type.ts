import {
	type PaginationQueryParameters,
	type ValueOf,
} from "../../../../libs/types/types.js";
import { type ContributorOrderByKey } from "../enums/enums.js";

type ContributorGetAllQueryParameters = {
	contributorName?: string | undefined;
	hasHidden?: boolean | undefined;
	orderBy?: undefined | ValueOf<typeof ContributorOrderByKey>;
	projectId?: number | undefined;
} & Partial<PaginationQueryParameters>;

export { type ContributorGetAllQueryParameters };
