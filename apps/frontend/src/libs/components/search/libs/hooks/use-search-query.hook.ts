import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSearchQueryParameters = (
	defaultSearch: string,
): {
	searchQuery: string;
	updateSearchParams: (newSearchValue: string) => void;
} => {
	const location = useLocation();
	const navigate = useNavigate();

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

export { useSearchQueryParameters };
