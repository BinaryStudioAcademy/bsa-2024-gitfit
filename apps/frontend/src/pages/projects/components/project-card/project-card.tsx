import { NavLink } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { ProjectMenu } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	onEditClick: (project: ProjectGetAllItemResponseDto) => void;
	project: ProjectGetAllItemResponseDto;
};

const ProjectCard = ({ onEditClick, project }: Properties): JSX.Element => {
	const projectRoute = configureString(AppRoute.PROJECT, {
		id: project.id.toString(),
	});

	const handleEditClick = useCallback(() => {
		onEditClick(project);
	}, [onEditClick, project]);

	return (
		<div className={styles["project"]}>
			<NavLink className={styles["project-link"] ?? ""} to={projectRoute}>
				{project.name}
			</NavLink>
			<ProjectMenu onEditClick={handleEditClick} />
		</div>
	);
};

export { ProjectCard };
