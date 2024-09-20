import { QueryParameterName } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";

type SearchOptions = {
	shouldUseQuery?: boolean;
};

const useSearch = ({ shouldUseQuery = true }: SearchOptions = {}): {
	onSearch: (search: string) => void;
	search: string;
} => {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const searchParameterName = QueryParameterName.SEARCH;

	const searchParameter = shouldUseQuery
		? (searchParameters.get(searchParameterName) ?? "")
		: "";
	const [search, setSearch] = useState<string>(searchParameter);

	useEffect(() => {
		if (shouldUseQuery) {
			const updatedSearchParameters = new URLSearchParams(searchParameters);
			updatedSearchParameters.set(searchParameterName, search);
			setSearchParameters(updatedSearchParameters);
		}
	}, [
		search,
		searchParameters,
		searchParameterName,
		setSearchParameters,
		shouldUseQuery,
	]);

	return {
		onSearch: setSearch,
		search,
	};
};

export { useSearch };
