import { AppRoute } from "~/libs/enums/enums.js";

import { SidebarItem } from "./sidebar-item.js";

const sidebarItems = [
	{ icon: "p", id: "1", text: "Projects", to: AppRoute.ROOT },
	{ icon: "a", id: "2", text: "Access Management", to: AppRoute.ROOT },
	{ icon: "c", id: "3", text: "Contributors", to: AppRoute.ROOT },
	{ icon: "n", id: "4", text: "Analytics", to: AppRoute.ROOT },
];

const Sidebar = (): JSX.Element => {
	return (
		<ul className="sidebar">
			{sidebarItems.map((item) => (
				<SidebarItem
					icon={item.icon}
					key={item.id}
					text={item.text}
					to={item.to}
				/>
			))}
		</ul>
	);
};

export { Sidebar };
