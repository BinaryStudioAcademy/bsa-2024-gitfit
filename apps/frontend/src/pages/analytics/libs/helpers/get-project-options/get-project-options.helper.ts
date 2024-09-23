import { type SelectOption } from "~/libs/types/select-option.type.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

const getProjectOptions = (
	projects: ProjectGetAllItemResponseDto[],
): SelectOption<number>[] =>
	projects.map((project) => ({
		label: project.name,
		value: project.id,
	}));

export { getProjectOptions };
