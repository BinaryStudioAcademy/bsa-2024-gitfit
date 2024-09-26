import { getPermittedNavigationItems } from "~/libs/helpers/helpers.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import {
	type NavigationItem,
	type PermissionGetAllItemResponseDto,
	type ProjectPermissionsGetAllItemResponseDto,
} from "~/libs/types/types.js";

import { SidebarItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	items: NavigationItem[];
	projectPermissions: ProjectPermissionsGetAllItemResponseDto[];
	userPermissions: PermissionGetAllItemResponseDto[];
};

const Sidebar = ({
	items,
	projectPermissions,
	userPermissions,
}: Properties): JSX.Element => {
	const filteredItems = useMemo(() => {
		return getPermittedNavigationItems(
			items,
			userPermissions,
			projectPermissions,
		);
	}, [items, projectPermissions, userPermissions]);

	return (
		<ul className={styles["sidebar"]}>
			{filteredItems.map((item) => (
				<SidebarItem
					href={item.href}
					icon={item.icon}
					key={item.label}
					label={item.label}
				/>
			))}
		</ul>
	);
};

export { Sidebar };
