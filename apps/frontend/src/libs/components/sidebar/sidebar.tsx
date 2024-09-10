import { checkHasPermission } from "~/libs/helpers/helpers.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import {
	type NavigationItem,
	type PermissionGetAllItemResponseDto,
} from "~/libs/types/types.js";

import { SidebarItem } from "./libs/components/components.js";
import styles from "./styles.module.css";

type Properties = {
	items: NavigationItem[];
	userPermissions: PermissionGetAllItemResponseDto[];
};

const Sidebar = ({ items, userPermissions }: Properties): JSX.Element => {
	const filteredItems = useMemo(() => {
		return items.filter(({ pagePermissions = [] }) =>
			checkHasPermission(pagePermissions, userPermissions),
		);
	}, [items, userPermissions]);

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
