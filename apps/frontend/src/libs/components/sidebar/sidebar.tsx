import { SidebarItem } from "./sidebar-item/sidebar-item.js";
import { sidebarItems } from "./sidebar-items.js";
import styles from "./styles.module.css";

const Sidebar = (): JSX.Element => {
	return (
		<ul className={styles["sidebar"]}>
			{sidebarItems.map((item) => (
				<SidebarItem
					icon={item.icon}
					key={item.id}
					text={item.text}
					{...(item.to ? { to: item.to } : {})}
				/>
			))}
		</ul>
	);
};

export { Sidebar };
