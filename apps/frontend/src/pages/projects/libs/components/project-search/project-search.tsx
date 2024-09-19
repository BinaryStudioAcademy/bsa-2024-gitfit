import { type Control, type FieldErrors } from "react-hook-form";

import { Search } from "~/libs/components/components.js";

type ProjectSearchForm = {
	search: string;
};

type Properties = {
	control: Control<ProjectSearchForm>;
	errors: FieldErrors<ProjectSearchForm>;
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
