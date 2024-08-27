import React from "react";

import { Icon } from "~/libs/components/components.js"; // Ensure the correct path to your Icon component
import { useLocation } from "~/libs/hooks/hooks.js"; // Assuming you're using react-router
import styles from "./styles.module.css";

type BreadcrumbItem = {
	link?: string;
	name: string;
};

type Properties = {
	items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: Properties): JSX.Element => {
	const location = useLocation();
	const LAST_ITEM_OFFSET = 1;

	return (
		<nav aria-label="breadcrumb" className={styles["breadcrumbContainer"]}>
			<ol className={styles["breadcrumbList"]}>
				{items.map((item, index) => {
					const isCurrentPage = location.pathname === item.link;
					const isLastItem = index === items.length - LAST_ITEM_OFFSET;

					return (
						<li className={styles["breadcrumbItem"]} key={index}>
							{isCurrentPage ? (
								<span className={styles["breadcrumbCurrent"]}>{item.name}</span>
							) : (
								<a className={styles["breadcrumbLink"]} href={item.link}>
									{item.name}
								</a>
							)}
							{!isLastItem && (
								<span className={styles["breadcrumbSeparator"]}>
									<Icon
										color="var(--color-border-primary)"
										height={20}
										name="lessThan"
										width={20}
									/>
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export { Breadcrumbs };
