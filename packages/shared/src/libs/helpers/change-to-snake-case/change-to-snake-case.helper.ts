import { snakeCase } from "change-case";

const changeToSnakeCase = (input: string): string => {
	return snakeCase(input);
};

export { changeToSnakeCase };
