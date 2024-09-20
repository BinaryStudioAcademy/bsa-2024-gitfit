import { QueryParameterName } from "~/libs/enums/enums.js";
import { useEffect, useSearchParams, useState } from "~/libs/hooks/hooks.js";

const useSearch = (
	useQueryParameters: boolean = true,
): {
	onSearch: (search: string) => void;
	search: string;
} => {
	const [searchParameters, setSearchParameters] = useSearchParams();
	const [search, setSearch] = useState<string>(
		useQueryParameters
			? (searchParameters.get(QueryParameterName.SEARCH) ?? "")
			: "",
	);

	useEffect(() => {
		if (useQueryParameters) {
			const updatedParameters = new URLSearchParams(searchParameters);
			updatedParameters.set(QueryParameterName.SEARCH, search);
			setSearchParameters(updatedParameters);
		}
	}, [search, searchParameters, useQueryParameters, setSearchParameters]);

	return {
		onSearch: setSearch,
		search,
	};
};

export { useSearch };
