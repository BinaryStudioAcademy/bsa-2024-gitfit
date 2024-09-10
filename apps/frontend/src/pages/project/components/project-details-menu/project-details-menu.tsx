import { useNavigate } from "react-router-dom";

import { Menu, MenuItem } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import { useCallback, usePopover } from "~/libs/hooks/hooks.js";

type Properties = {
	id: number;
};

const ProjectDetailsMenu = ({ id }: Properties): JSX.Element => {
	const projectRoute = configureString(AppRoute.PROJECT_ACCESS_MANAGEMENT, {
		id: id.toString(),
	});

	const { isOpened, onClose, onOpen } = usePopover();
	const navigate = useNavigate();

	const handleManageClick = useCallback(() => {
		navigate(projectRoute);
	}, [navigate, projectRoute]);

	return (
		<Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
			<MenuItem
				iconName="access"
				label="Manage Access"
				onClick={handleManageClick}
			/>
		</Menu>
	);
};

export { ProjectDetailsMenu };
