import { QueryParameterName } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

type Parameters = {
	isSavedToUrl?: boolean;
	queryParameterName?: ValueOf<typeof QueryParameterName>;
};

const useSearchFilters = ({
	isSavedToUrl = true,
	queryParameterName = QueryParameterName.SEARCH,
}: Parameters = {}): {
	onSearch: (search: string) => void;
	search: string;
} => {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const searchParameter = isSavedToUrl
		? (searchParameters.get(queryParameterName) ?? "")
		: "";
	const [search, setSearch] = useState<string>(searchParameter);

	const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

	useEffect(() => {
		if (isInitialLoad) {
			setIsInitialLoad(false);

			return;
		}

		if (isSavedToUrl) {
			const updatedSearchParameters = new URLSearchParams(searchParameters);
			updatedSearchParameters.set(queryParameterName, search);
			setSearchParameters(updatedSearchParameters);
		}
	}, [
		search,
		searchParameters,
		queryParameterName,
		setSearchParameters,
		isSavedToUrl,
	]);

	return {
		onSearch: setSearch,
		search,
	};
};

export { useSearchFilters };
