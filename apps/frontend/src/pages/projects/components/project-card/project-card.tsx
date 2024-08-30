import { NavLink } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import styles from "./styles.module.css";

type Properties = {
	project: ProjectGetAllItemResponseDto;
};

const ProjectCard = ({ project }: Properties): JSX.Element => {
	const projectRoute = configureString(AppRoute.PROJECT, {
		id: project.id.toString(),
	});

	return (
		<NavLink className={styles["project"] ?? ""} to={projectRoute}>
			{project.name}
		</NavLink>
	);
};

export { ProjectCard };
