import { Icon } from "~/libs/components/components.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { ProjectPopover } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	project: ProjectGetAllItemResponseDto;
};

const ProjectCard = ({ project }: Properties): JSX.Element => {
	return (
		<div className={styles["project"]}>
			{project.name}
			<ProjectPopover project={project}>
				<Icon height={20} name="options" width={20} />
			</ProjectPopover>
		</div>
	);
};

export { ProjectCard };
