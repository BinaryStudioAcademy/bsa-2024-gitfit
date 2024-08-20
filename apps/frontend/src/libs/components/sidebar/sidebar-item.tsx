import { type FC } from "react";

import { Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import styles from "./styles.module.css";

type Properties = {
	icon: FC<React.SVGProps<SVGSVGElement>>;
	text: string;
	to?: ValueOf<typeof AppRoute>;
};

const SidebarItem = ({ icon, text, to }: Properties): JSX.Element => (
	<li>
		{to ? (
			<Link className={styles["sidebar-link"] ?? ""} to={to}>
				<Icon className={styles["icon-sidebar"] ?? ""} Icon={icon} />
				{text}
			</Link>
		) : (
			<span className={styles["sidebar-link"] ?? ""}>
				<Icon className={styles["icon-sidebar"] ?? ""} Icon={icon} />
				{text}
			</span>
		)}
	</li>
);

export { SidebarItem };
