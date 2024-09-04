import { Permission } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type NavigationItem } from "~/libs/types/navigation-item.type.js";

import { SidebarItem } from "./sidebar-item/sidebar-item.js";
import styles from "./styles.module.css";

type Properties = {
	items: NavigationItem[];
};

const Sidebar = ({ items }: Properties): JSX.Element => {
	const { permissions } = useAppSelector(({ permissions }) => permissions);

	const filteredItems = items.filter((item) => {
		if (item.label === "Access Management") {
			return permissions.some(
				(permission) => permission.key === Permission.MANAGE_USER_ACCESS,
			);
		}

		return true;
	});

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
