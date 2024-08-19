import { Link } from "~/libs/components/components.js";
import { type AppRoute } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type Properties = {
	icon: string;
	text: string;
	to: ValueOf<typeof AppRoute>;
};

const SidebarItem = ({ icon, text, to }: Properties): JSX.Element => (
	<li>
		<Link className="sidebar-link" to={to}>
			<span className="icon-sidebar">{icon}</span>
			{text}
		</Link>
	</li>
);

export { SidebarItem };
