import { Icon, Link } from "~/libs/components/components.js";
import { type IconName } from "~/libs/components/icon/types/types.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	href: undefined | ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
};

const SidebarItem = ({ href, icon, label }: Properties): JSX.Element => (
	<li className={styles["sidebar-item"]}>
		{href ? (
			<Link className={styles["sidebar-link"] ?? ""} to={href}>
				<Icon name={icon} />
				<label>{label}</label>
			</Link>
		) : (
			<span className={styles["sidebar-link"] ?? ""}>
				<Icon name={icon} />
				<label>{label}</label>
			</span>
		)}
	</li>
);

export { SidebarItem };
