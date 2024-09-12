import { useNavigate } from "react-router-dom";

import { Menu, MenuItem } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	id: number;
};

const ProjectDetailsMenu = ({ id }: Properties): JSX.Element => {
	const projectAccessManagementRoute = configureString(
		AppRoute.PROJECT_ACCESS_MANAGEMENT,
		{
			id: id.toString(),
		},
	);

	const { isOpened, onClose, onOpen } = usePopover();
	const navigate = useNavigate();

	const handleManagementClick = useCallback(() => {
		navigate(projectAccessManagementRoute);
	}, [navigate, projectAccessManagementRoute]);

	return (
		<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
			<MenuItem
				iconName="access"
				label="Manage Access"
				onClick={handleManagementClick}
			/>
		</Menu>
	);
};

export { ProjectDetailsMenu };
