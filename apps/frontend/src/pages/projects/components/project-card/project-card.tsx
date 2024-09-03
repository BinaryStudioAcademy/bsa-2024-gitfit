import { NavLink } from "react-router-dom";

import { Icon } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { ProjectPopover } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	project: ProjectGetAllItemResponseDto;
};

const ProjectCard = ({ project }: Properties): JSX.Element => {
	const projectRoute = configureString(AppRoute.PROJECT, {
		id: project.id.toString(),
	});

	return (
		<div className={styles["project"]}>
			<NavLink className={styles["project-link"] ?? ""} to={projectRoute}>
				{project.name}
			</NavLink>
			<ProjectPopover project={project}>
				<span className={styles["project-options-icon"]}>
					<Icon height={20} name="options" width={20} />
				</span>
			</ProjectPopover>
		</div>
	);
};

export { ProjectCard };
