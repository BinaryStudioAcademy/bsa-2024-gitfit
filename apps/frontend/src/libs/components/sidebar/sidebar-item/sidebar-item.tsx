import { Icon, Link } from "~/libs/components/components.js";
import { type IconName } from "~/libs/components/icon/types/types.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	href: "#" | ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
};

const SidebarItem = ({ href, icon, label }: Properties): JSX.Element => (
	<li className={styles["sidebar-item"]}>
		<Link to={href}>
			<Icon height={17} name={icon} width={17} />
			<label>{label}</label>
		</Link>
	</li>
);

export { SidebarItem };
