import { QueryParameterName } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";

type UseSearch = {
	onSearch: (search: string) => void;
	search: string;
};

const useSearch = (): UseSearch => {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const searchParameterName = QueryParameterName.SEARCH;
	const searchParameter = searchParameters.get(searchParameterName) ?? "";

	const [search, setSearch] = useState<string>(searchParameter);

	useEffect(() => {
		const updatedSearchParameters = new URLSearchParams(searchParameters);

		updatedSearchParameters.set(searchParameterName, search);

		setSearchParameters(updatedSearchParameters);
	}, [search, searchParameters, searchParameterName, setSearchParameters]);

	return {
		onSearch: setSearch,
		search,
	};
};

export { useSearch };
