import { type BreadcrumbItemType } from "~/libs/types/types.js";

import { BreadcrumbItem } from "./breadcrumbs-item/breadcrumbs-item.js";
import styles from "./styles.module.css";

type Properties = {
	items: BreadcrumbItemType[];
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
