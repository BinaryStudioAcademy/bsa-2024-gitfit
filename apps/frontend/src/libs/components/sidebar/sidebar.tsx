import { SidebarItem } from "./sidebar-item/sidebar-item.js";
import { type NavigationItem } from "./sidebar-item/type.js";
import styles from "./styles.module.css";

const Sidebar = ({ items }: { items: NavigationItem[] }): JSX.Element => {
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
