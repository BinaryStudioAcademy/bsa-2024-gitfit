import { NavLink } from "react-router-dom";

import { Icon } from "~/libs/components/components.js";
import { type IconName } from "~/libs/components/icon/types/types.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
};

const SidebarItem = ({ href, icon, label }: Properties): JSX.Element => (
	<li className={styles["sidebar-item"]}>
		<NavLink className={styles["navigation-link"] ?? ""} to={href}>
			<Icon height={20} name={icon} width={20} />
			<label className={styles["navigation-item-label"]}>{label}</label>
		</NavLink>
	</li>
);

export { SidebarItem };
