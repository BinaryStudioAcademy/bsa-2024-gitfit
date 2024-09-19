import { useNavigate } from "react-router-dom";

import { Menu, MenuItem } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	hasPermission: boolean[][] | false | undefined;
	projectId: number;
};

const ProjectDetailsMenu = ({
	hasPermission,
	projectId,
}: Properties): JSX.Element => {
	// const { authenticatedUser } = useAppSelector(({ auth }) => auth);

	// const mainPermission = authenticatedUser
	// 	? authenticatedUser.groups.flatMap((group) => group.permissions)
	// 	: [];

	// const projectPermission = authenticatedUser
	// 	? authenticatedUser.projectGroups.flatMap(
	// 			(projectGroup) => projectGroup.permissions,
	// 		)
	// 	: [];
	// const userPermissions = [...projectPermission, ...mainPermission];

	// const hasRootPermission =
	// 	checkHasPermission(
	// 		[PermissionKey.VIEW_ALL_PROJECTS, PermissionKey.MANAGE_PROJECT],
	// 		userPermissions,
	// 	) &&
	// 	authenticatedUser?.projectGroups.map((project) =>
	// 		project.projectId.map((id) => id === projectId),
	// 	);

	const projectAccessManagementRoute = configureString(
		AppRoute.PROJECT_ACCESS_MANAGEMENT,
		{
			id: projectId.toString(),
		},
	);

	const { isOpened, onClose, onOpen } = usePopover();
	const navigate = useNavigate();

	const handleManagementClick = useCallback(() => {
		navigate(projectAccessManagementRoute);
	}, [navigate, projectAccessManagementRoute]);

	return (
		<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
			{hasPermission && (
				<MenuItem
					iconName="access"
					label="Manage Access"
					onClick={handleManagementClick}
				/>
			)}
		</Menu>
	);
};

export { ProjectDetailsMenu };
