import { Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	icon: string;
	text: string;
	to?: ValueOf<typeof AppRoute>;
};

const SidebarItem = ({ icon, text, to }: Properties): JSX.Element => (
	<li>
		{to ? (
			<Link className={styles["sidebar-link"] ?? ""} to={to}>
				<img alt={text} className={styles["icon-sidebar"]} src={icon} />
				{text}
			</Link>
		) : (
			<span className={styles["sidebar-link"] ?? ""}>
				<img alt={text} className={styles["icon-sidebar"]} src={icon} />
				{text}
			</span>
		)}
	</li>
);

export { SidebarItem };
