import snakeCase from "lodash/snakeCase.js";

const transformToSnakeCase = (name: string): string => {
	return snakeCase(name);
};

export { transformToSnakeCase };
