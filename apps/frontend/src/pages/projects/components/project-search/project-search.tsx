import { type FormEvent } from "react";

import { Search } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	onValueChange: (search: string) => void;
};

const ProjectsSearch = ({ onValueChange }: Properties): JSX.Element => {
	const handleSubmit = useCallback((event: FormEvent) => {
		event.preventDefault();
	}, []);

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleSubmit}>
			<Search onValueChange={onValueChange} />
		</form>
	);
};

export { ProjectsSearch };
