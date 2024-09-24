import { QueryParameterName } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

type Parameters = {
	isSavedToUrl?: boolean;
	queryParameterName?: ValueOf<typeof QueryParameterName>;
};

const useQueryParameters = ({
	isSavedToUrl = true,
	queryParameterName,
}: Parameters = {}): {
	onSearch: (search: string) => void;
	search: string;
} => {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const searchParameterName = queryParameterName ?? QueryParameterName.SEARCH;

	const searchParameter = isSavedToUrl
		? (searchParameters.get(searchParameterName) ?? "")
		: "";
	const [search, setSearch] = useState<string>(searchParameter);

	useEffect(() => {
		if (isSavedToUrl) {
			const updatedSearchParameters = new URLSearchParams(searchParameters);
			updatedSearchParameters.set(searchParameterName, search);
			setSearchParameters(updatedSearchParameters);
		}
	}, [
		search,
		searchParameters,
		searchParameterName,
		setSearchParameters,
		isSavedToUrl,
	]);

	return {
		onSearch: setSearch,
		search,
	};
};

export { useQueryParameters };
