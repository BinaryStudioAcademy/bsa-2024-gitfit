import { type NavigationItem } from "~/libs/types/navigation-item.type.js";
import { SidebarItem } from "./sidebar-item/sidebar-item.js";
import styles from "./styles.module.css";
import { useMemo } from "~/libs/hooks/hooks.js";

type Properties = {
	items: NavigationItem[];
	userPermissions: { key: string; name: string }[];
};

const Sidebar = ({ items, userPermissions }: Properties): JSX.Element => {
	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			if (item.pagePermissions) {
				return item.pagePermissions.every((permission) =>
					userPermissions.some(
						(userPermission) => userPermission.key === permission,
					),
				);
			}

			return true;
		});
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
