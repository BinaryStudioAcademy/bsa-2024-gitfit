import { changeCase } from "~/libs/helpers/helpers.js";

const generateProjectGroupKey = ({
	name,
	projectId,
}: {
	name: string;
	projectId: number;
}): string => {
	const key = [projectId, name].join(" ");

	return changeCase(key, "snakeCase");
};

export { generateProjectGroupKey };
