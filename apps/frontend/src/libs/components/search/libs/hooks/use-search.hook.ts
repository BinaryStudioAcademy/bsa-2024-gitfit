import { QueryParameterName } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";

type UseSearch = {
	search: string;
	setSearch: (search: string) => void;
};

const useSearch = (): UseSearch => {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const searchParameterName = QueryParameterName.SEARCH;
	const searchParameter = searchParameters.get(searchParameterName);

	const [search, setSearch] = useState<string>(searchParameter ?? "");

	useEffect(() => {
		const updatedSearchParameters = new URLSearchParams(searchParameters);

		updatedSearchParameters.set(searchParameterName, search);

		setSearchParameters(updatedSearchParameters);
	}, [search, searchParameters, searchParameterName, setSearchParameters]);

	return {
		search,
		setSearch,
	};
};

export { useSearch };
