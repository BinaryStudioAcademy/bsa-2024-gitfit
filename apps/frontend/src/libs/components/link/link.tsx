import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type Properties = {
	children: React.ReactNode;
	to: ValueOf<typeof AppRoute>;
};

const Link: React.FC<Properties> = ({ children, to }: Properties) => (
	<NavLink to={to}>{children}</NavLink>
);

export { Link };
