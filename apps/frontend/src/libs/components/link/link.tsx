import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	to: ValueOf<typeof AppRoute>;
};

const Link = ({ children, to }: Properties): JSX.Element => (
	<NavLink className={styles["link"] ?? ""} to={to}>
		{children}
	</NavLink>
);

export { Link };
export { NavLink } from "react-router-dom";
