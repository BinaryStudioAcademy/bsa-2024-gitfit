import { type Control, type FieldErrors } from "react-hook-form";

import { Search } from "~/libs/components/components.js";
import { type SearchForm } from "~/libs/types/types.js";

type Properties = {
	control: Control<SearchForm>;
	errors: FieldErrors<SearchForm>;
	onChange: (search: string) => void;
};

const ProjectsSearch = ({
	control,
	errors,
	onChange,
}: Properties): JSX.Element => {
	return (
		<div>
			<Search
				control={control}
				errors={errors}
				isLabelHidden
				label="Projects search"
				onChange={onChange}
				placeholder="Enter project name"
			/>
		</div>
	);
};

export { ProjectsSearch };
