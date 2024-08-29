import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import styles from "./styles.module.css";

type Properties = {
	project: ProjectGetAllItemResponseDto;
};

const ProjectCard = ({ project }: Properties): JSX.Element => {
	return <div className={styles["project"]}>{project.name}</div>;
};

export { ProjectCard };
