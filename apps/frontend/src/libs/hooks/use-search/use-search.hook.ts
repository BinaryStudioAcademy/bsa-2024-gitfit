import { QueryParameterName } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";

const useSearch = (): {
	onSearch: (search: string) => void;
	resetSearch: () => void;
	search: string;
} => {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const searchParameterName = QueryParameterName.SEARCH;
	const searchParameter = searchParameters.get(searchParameterName) ?? "";

	const [search, setSearch] = useState<string>(searchParameter);

	useEffect(() => {
		const updatedSearchParameters = new URLSearchParams(searchParameters);
		updatedSearchParameters.set(searchParameterName, search);
		setSearchParameters(updatedSearchParameters);
	}, [search, searchParameters, searchParameterName, setSearchParameters]);

	const resetSearch = (): void => {
		setSearch("");
		const updatedSearchParameters = new URLSearchParams(searchParameters);
		updatedSearchParameters.delete(searchParameterName);
		setSearchParameters(updatedSearchParameters);
	};

	return {
		onSearch: setSearch,
		resetSearch,
		search,
	};
};

export { useSearch };
