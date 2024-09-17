import { NavLink } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { getColor, getRelativeDateLabel } from "../../helpers/helpers.js";
import { ActivityIndicator, ProjectMenu } from "../components.js";
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

	const currentDate = new Date();
	const lastActivityDate = project.lastActivityDate
		? new Date(project.lastActivityDate)
		: null;

	const lastUpdateLabel = getRelativeDateLabel(currentDate, lastActivityDate);
	const colorStatus = getColor(currentDate, lastActivityDate);

	return (
		<div className={styles["project-container"]}>
			<NavLink className={styles["project"] as string} to={projectRoute}>
				{project.name}
			</NavLink>
			{lastUpdateLabel && colorStatus && (
				<ActivityIndicator label={lastUpdateLabel} status={colorStatus} />
			)}
			<ProjectMenu onDelete={handleDeleteClick} onEdit={handleEditClick} />
		</div>
	);
};

export { ProjectCard };
