import {
	Menu,
	MenuItem,
	ProtectedComponent,
} from "~/libs/components/components.js";
import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useAppSelector, useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	onEdit: () => void;
	projectId: number;
};

const ProjectDetailsMenu = ({
	onEdit,
	projectId,
}: Properties): JSX.Element | null => {
	const { isOpened, onClose, onOpen } = usePopover();
	const { authenticatedUser } = useAppSelector(({ auth }) => auth);

	const handleEditClick = useCallback(() => {
		onEdit();
		onClose();
	}, [onEdit, onClose]);

	if (!authenticatedUser) {
		return null;
	}

	const projectAccessManagementRoute = configureString(
		AppRoute.PROJECT_ACCESS_MANAGEMENT,
		{
			id: projectId.toString(),
		},
	);

	return (
		<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
			<MenuItem iconName="pencil" label="Edit" onClick={handleEditClick} />

			<ProtectedComponent
				requiredPermissions={[PermissionKey.MANAGE_ALL_PROJECTS]}
			>
				<MenuItem
					href={projectAccessManagementRoute}
					iconName="access"
					label="Manage Access"
				/>
			</ProtectedComponent>
		</Menu>
	);
};

export { ProjectDetailsMenu };
