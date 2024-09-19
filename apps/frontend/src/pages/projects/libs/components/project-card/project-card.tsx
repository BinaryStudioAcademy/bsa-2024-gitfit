import { NavLink } from "react-router-dom";

import { ActivityIndicator } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	configureString,
	getActivityIndicatorStatus,
	getDifferenceInDays,
	getRelativeDate,
	getStartOfDay,
} from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type PermissionGetAllItemResponseDto } from "~/modules/permissions/permissions.js";
import { type ProjectGetAllItemResponseDto } from "~/modules/projects/projects.js";

import { ProjectMenu } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	onDelete: (project: ProjectGetAllItemResponseDto) => void;
	onEdit: (project: ProjectGetAllItemResponseDto) => void;
	project: ProjectGetAllItemResponseDto;
	userPermissions: PermissionGetAllItemResponseDto[];
};

const ProjectCard = ({
	onDelete,
	onEdit,
	project,
	userPermissions,
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

	const currentDate = getStartOfDay(new Date());
	const lastActivityDate = project.lastActivityDate
		? getStartOfDay(new Date(project.lastActivityDate))
		: null;

	const daysDifference = lastActivityDate
		? getDifferenceInDays(currentDate, lastActivityDate)
		: null;

	const lastUpdateLabel = lastActivityDate
		? `Updated ${getRelativeDate(lastActivityDate, currentDate)}`
		: null;

	const colorStatus =
		typeof daysDifference === "number"
			? getActivityIndicatorStatus(daysDifference)
			: null;

	const hasActivityIndicator = lastUpdateLabel !== null && colorStatus !== null;

	return (
		<div className={styles["project-container"]}>
			<NavLink className={styles["project"] as string} to={projectRoute} />
			<span className={styles["project-name"]}>{project.name}</span>
			{hasActivityIndicator && (
				<ActivityIndicator label={lastUpdateLabel} status={colorStatus} />
			)}
			<ProjectMenu
				onDelete={handleDeleteClick}
				onEdit={handleEditClick}
				userPermissions={userPermissions}
			/>
		</div>
	);
};

export { ProjectCard };
