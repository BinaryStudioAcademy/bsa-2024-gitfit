import { QueryParameterName } from "~/libs/enums/enums.js";
import {
	useCallback,
	useEffect,
	useSearchParams,
	useState,
} from "~/libs/hooks/hooks.js";

type UseSearch = () => {
	onSearchChange: (search: string) => void;
	search: string;
};

const useSearch: UseSearch = () => {
	const [searchParameters, setSearchParameters] = useSearchParams();

	const searchParameterName = QueryParameterName.SEARCH;

	const NamedSearchParameter = searchParameters.get(searchParameterName);

	const [search, setSearch] = useState<string>(NamedSearchParameter || "");

	useEffect(() => {
		const updatedSearchParameters = new URLSearchParams(searchParameters);

		if (search) {
			updatedSearchParameters.set(searchParameterName, search);
		} else {
			updatedSearchParameters.delete(searchParameterName);
		}

		setSearchParameters(updatedSearchParameters);
	}, [search, searchParameters, searchParameterName, setSearchParameters]);

	const onSearchChange = useCallback((newSearchValue: string) => {
		setSearch(newSearchValue);
	}, []);

	return {
		onSearchChange,
		search,
	};
};

export { useSearch };
