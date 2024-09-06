import { useLocation, useNavigate } from "react-router-dom";

import { useCallback } from "~/libs/hooks/hooks.js";

import { SEARCH_PARAMETER_KEY } from "../constants/constants.js";

type Properties = {
	searchQuery: string;
	updateSearchParams: (newSearchValue: string) => void;
};

const useSearchQueryParameter = (defaultSearch: string): Properties => {
	const location = useLocation();
	const navigate = useNavigate();

	const getSearchQuery = useCallback((): string => {
		const searchParameters = new URLSearchParams(location.search);

		return searchParameters.get(SEARCH_PARAMETER_KEY) || defaultSearch;
	}, [location.search, defaultSearch]);

	const updateSearchParameters = useCallback(
		(newSearchValue: string): void => {
			const searchParameters = new URLSearchParams(location.search);

			if (newSearchValue) {
				searchParameters.set(SEARCH_PARAMETER_KEY, newSearchValue);
			} else {
				searchParameters.delete(SEARCH_PARAMETER_KEY);
			}

			navigate({ search: searchParameters.toString() }, { replace: true });
		},
		[location.search, navigate],
	);

	return {
		searchQuery: getSearchQuery(),
		updateSearchParams: updateSearchParameters,
	};
};

export { useSearchQueryParameter };
