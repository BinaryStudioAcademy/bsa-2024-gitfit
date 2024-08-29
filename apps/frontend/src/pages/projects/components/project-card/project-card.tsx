import { type ProjectResponseDto } from "~/modules/projects/projects.js";

import styles from "./styles.module.css";

type Properties = {
	project: ProjectResponseDto;
};

const ProjectCard = ({ project }: Properties): JSX.Element => {
	return <div className={styles["project"]}>{project.name}</div>;
};

export { ProjectCard };
