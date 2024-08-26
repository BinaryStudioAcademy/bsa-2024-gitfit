import { type NavigationItem } from "~/libs/types/navigation-item.type.js";

import { SidebarItem } from "./sidebar-item/sidebar-item.js";
import styles from "./styles.module.css";

type Properties = {
	items: NavigationItem[];
};

const Sidebar = ({ items }: Properties): JSX.Element => {
	return (
		<ul className={styles["sidebar"]}>
			{items.map((item) => (
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
