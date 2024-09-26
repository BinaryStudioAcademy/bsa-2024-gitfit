import {
	type PaginationQueryParameters,
	type ValueOf,
} from "../../../../libs/types/types.js";
import { type ContributorOrderBy } from "../enums/contributor-order-by.enum.js";

type ContributorGetAllQueryParameters = {
	contributorName?: string | undefined;
	hasHidden?: boolean | undefined;
	orderBy?: ValueOf<typeof ContributorOrderBy>;
	projectId?: number | undefined;
} & Partial<PaginationQueryParameters>;

export { type ContributorGetAllQueryParameters };
