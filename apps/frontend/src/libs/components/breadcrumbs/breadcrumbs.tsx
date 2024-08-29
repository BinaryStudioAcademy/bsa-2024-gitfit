import { type BreadcrumbNavigationItem } from "~/libs/components/types/breadcrumb-navigation-item.type.js";

import { BreadcrumbItem } from "./breadcrumbs-item/breadcrumbs-item.js";
import styles from "./styles.module.css";

type Properties = {
	items: BreadcrumbNavigationItem[];
};

const Breadcrumbs = ({ items }: Properties): JSX.Element => {
	return (
		<nav aria-label="breadcrumb" className={styles["breadcrumb-container"]}>
			<ol className={styles["breadcrumb-list"]}>
				{items.map((item, index) => (
					<BreadcrumbItem key={index} {...item} />
				))}
			</ol>
		</nav>
	);
};

export { Breadcrumbs };
