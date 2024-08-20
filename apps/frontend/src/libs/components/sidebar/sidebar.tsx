import { type FC } from "react";

import { AppRoute } from "~/libs/enums/enums.js";
import { Icons } from "~/libs/enums/svg-icons.enum.js";

import { SidebarItem } from "./sidebar-item.js";
import styles from "./styles.module.css";

const sidebarItems = [
	{
		icon: Icons.Project as FC<React.SVGProps<SVGSVGElement>>,
		id: "1",
		text: "Projects",
		to: AppRoute.ROOT,
	},
	{
		icon: Icons.Access as FC<React.SVGProps<SVGSVGElement>>,
		id: "2",
		text: "Access Management",
	},
	{
		icon: Icons.Contributors as FC<React.SVGProps<SVGSVGElement>>,
		id: "3",
		text: "Contributors",
	},
	{
		icon: Icons.Analytics as FC<React.SVGProps<SVGSVGElement>>,
		id: "4",
		text: "Analytics",
	},
];

const Sidebar = (): JSX.Element => {
	return (
		<ul className={styles["sidebar"]}>
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
