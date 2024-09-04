import { PAGE_NAME } from "~/libs/constants/constants.js";
import { PermissionKey } from "~/libs/enums/enums.js";
import { useAppSelector, useMemo } from "~/libs/hooks/hooks.js";
import { type NavigationItem } from "~/libs/types/navigation-item.type.js";

import { SidebarItem } from "./sidebar-item/sidebar-item.js";
import styles from "./styles.module.css";

type Properties = {
	items: NavigationItem[];
};

const Sidebar = ({ items }: Properties): JSX.Element => {
	const { permissions } = useAppSelector(({ permissions }) => permissions);

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			if (item.label === PAGE_NAME.ACCESS_MANAGEMENT) {
				return permissions.items.some(
					(permission) => permission.key === PermissionKey.MANAGE_USER_ACCESS,
				);
			}

			return true;
		});
	}, [items, permissions.items]);

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
