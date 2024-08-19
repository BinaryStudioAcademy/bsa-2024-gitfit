import { AppRoute } from "~/libs/enums/enums.js";
import { Icons } from "~/libs/enums/svg-icons.enum.js";

import { SidebarItem } from "./sidebar-item.js";

const sidebarItems = [
	{ icon: Icons.Project, id: "1", text: "Projects", to: AppRoute.ROOT },
	{ icon: Icons.Access, id: "2", text: "Access Management" },
	{ icon: Icons.Contributors, id: "3", text: "Contributors" },
	{ icon: Icons.Analytics, id: "4", text: "Analytics" },
];

const Sidebar = (): JSX.Element => {
	return (
		<ul className="sidebar">
			{sidebarItems.map((item) => (
				<SidebarItem
					icon={item.icon}
					key={item.id}
					text={item.text}
					{...(item.to ? { to: item.to } : {})}
				/>
			))}
		</ul>
	);
};

export { Sidebar };
