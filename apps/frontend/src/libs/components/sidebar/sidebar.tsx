import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

const Sidebar = (): JSX.Element => {
	return (
		<ul className="sidebar">
			<li>
				<Link to={AppRoute.ROOT}>Projects</Link>
			</li>
			<li>
				<Link to={AppRoute.ROOT}>Access Management</Link>
			</li>
			<li>
				<Link to={AppRoute.ROOT}>Contributors</Link>
			</li>
			<li>
				<Link to={AppRoute.ROOT}>Analytics</Link>
			</li>
		</ul>
	);
};

export { Sidebar };
