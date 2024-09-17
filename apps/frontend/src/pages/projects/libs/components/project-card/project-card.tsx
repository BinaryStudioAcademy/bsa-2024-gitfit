import { NavLink } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import { configureString, getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { getRelativeDateLabel } from "../../helpers/helpers.js";
import { ProjectMenu } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	onDelete: (project: ProjectGetAllItemResponseDto) => void;
	onEdit: (project: ProjectGetAllItemResponseDto) => void;
	project: ProjectGetAllItemResponseDto;
};

const ProjectCard = ({
	onDelete,
	onEdit,
	project,
}: Properties): JSX.Element => {
	const projectRoute = configureString(AppRoute.PROJECT, {
		id: project.id.toString(),
	});

	const handleEditClick = useCallback(() => {
		onEdit(project);
	}, [onEdit, project]);

	const handleDeleteClick = useCallback(() => {
		onDelete(project);
	}, [onDelete, project]);

	const lastUpdate = getRelativeDateLabel(project.lastActivityDate);

	return (
		<div className={styles["project-container"]}>
			<NavLink className={styles["project"] as string} to={projectRoute}>
				{project.name}
			</NavLink>
			{lastUpdate && (
				<div className={styles["last-activity-wrapper"]}>
					<span
						className={getValidClassNames(
							styles["last-activity"],
							styles[lastUpdate.colorClass],
						)}
					>
						{lastUpdate.label}
					</span>
				</div>
			)}
			<ProjectMenu onDelete={handleDeleteClick} onEdit={handleEditClick} />
		</div>
	);
};

export { ProjectCard };
