import { useLocation, useNavigate } from "react-router-dom";

import { useCallback } from "~/libs/hooks/hooks.js";

const location = useLocation();
const navigate = useNavigate();

const useSearchQueryParameter = (
	defaultSearch: string,
): {
	searchQuery: string;
	updateSearchParams: (newSearchValue: string) => void;
} => {
	const searchParameters = new URLSearchParams(location.search);
	const searchQuery = searchParameters.get("search") || defaultSearch;

	const updateSearchParameters = useCallback(
		(newSearchValue: string) => {
			const parameters = new URLSearchParams(location.search);

			if (newSearchValue) {
				parameters.set("search", newSearchValue);
			} else {
				parameters.delete("search");
			}

			navigate({ search: parameters.toString() }, { replace: true });
		},
		[location.search, navigate],
	);

	return { searchQuery, updateSearchParams: updateSearchParameters };
};

export { useSearchQueryParameter };
