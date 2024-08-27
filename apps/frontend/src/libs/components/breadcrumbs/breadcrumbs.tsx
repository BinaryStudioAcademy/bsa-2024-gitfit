import React from "react";

import styles from "./styles.module.css";

type BreadcrumbItem = {
	link?: string; // link is optional because the current item doesn't have a link
	name: string;
};

type Properties = {
	items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: Properties): JSX.Element => {
	return (
		<nav aria-label="breadcrumb" className={styles["breadcrumbContainer"]}>
			<ol className={styles["breadcrumbList"]}>
				{items.map((item, index) => (
					<li className={styles["breadcrumbItem"]} key={index}>
						{item.link ? (
							<a className={styles["breadcrumbLink"]} href={item.link}>
								{item.name}
							</a>
						) : (
							<span className={styles["breadcrumbCurrent"]}>{item.name}</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export { Breadcrumbs };
