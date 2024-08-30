import { Search } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	onChange: (search: string) => void;
};

const ProjectsSearch = ({ onChange }: Properties): JSX.Element => {
	const handleSubmit = useCallback((event: React.FormEvent) => {
		event.preventDefault();
	}, []);

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleSubmit}>
			<Search
				isLabelVisible={false}
				label="Projects search"
				onChange={onChange}
			/>
		</form>
	);
};

export { ProjectsSearch };
