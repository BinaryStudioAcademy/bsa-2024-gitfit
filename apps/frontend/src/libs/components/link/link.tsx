import { NavLink } from "react-router-dom";

import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type Properties = {
	children: React.ReactNode;
	className?: string;
	to: ValueOf<typeof AppRoute>;
};

const Link = ({ children, className = "", to }: Properties): JSX.Element => (
	<NavLink className={className} to={to}>
		{children}
	</NavLink>
);

export { Link };
