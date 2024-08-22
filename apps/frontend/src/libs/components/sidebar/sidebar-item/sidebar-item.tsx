import { Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Icon } from "../../icon/icon.js";
import { type IconName } from "../../icon/types/icon-name.type.js";
import styles from "./styles.module.css";

type Properties = {
	icon: IconName;
	text: string;
	to?: ValueOf<typeof AppRoute>;
};

const SidebarItem = ({ icon, text, to }: Properties): JSX.Element => (
	<li>
		{to ? (
			<Link className={styles["sidebar-link"] ?? ""} to={to}>
				<Icon className={styles["icon-sidebar"] ?? ""} name={icon} />
				<label>{text}</label>
			</Link>
		) : (
			<span className={styles["sidebar-link"] ?? ""}>
				<Icon className={styles["icon-sidebar"] ?? ""} name={icon} />
				<label>{text}</label>
			</span>
		)}
	</li>
);

export { SidebarItem };
