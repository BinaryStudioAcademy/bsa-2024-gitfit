import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

const useSearchReset = (defaultSearch: string): (() => void) => {
	const { handleReset } = useAppForm({
		defaultValues: { search: defaultSearch },
	});

	return useCallback(() => {
		handleReset();
	}, [handleReset]);
};

export { useSearchReset };
