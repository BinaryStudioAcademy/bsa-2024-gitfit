import { Icon, NavLink } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type NavigationItem } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const SidebarItem = ({ href, icon, label }: NavigationItem): JSX.Element => {
	const getClassName = useCallback(
		({ isActive }: { isActive: boolean }): string => {
			return getValidClassNames(
				styles["navigation-link"],
				isActive && styles["active"],
			);
		},
		[],
	);

	return (
		<li className={styles["sidebar-item"]}>
			<NavLink className={getClassName} to={href}>
				<span className={styles["navigation-icon"]}>
					<Icon height={20} name={icon} width={20} />
				</span>
				<label className={styles["navigation-item-label"]}>{label}</label>
			</NavLink>
		</li>
	);
};

export { SidebarItem };
