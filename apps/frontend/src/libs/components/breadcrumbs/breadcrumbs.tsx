import { type BreadcrumbItemType } from "~/libs/types/types.js";

import { BreadcrumbItem } from "./breadcrumbs-item/breadcrumbs-item.js";
import styles from "./styles.module.css";

type Properties = {
	items: BreadcrumbItemType[];
};

const firstItemOffset = 0;
const lastItemOffset = -1;

const Breadcrumbs = ({ items }: Properties): JSX.Element => {
	const breadcrumbsExceptLast = items.slice(firstItemOffset, lastItemOffset);
	const lastBreadcrumb = items.at(lastItemOffset);

	return (
		<nav aria-label="breadcrumb" className={styles["breadcrumb-container"]}>
			<ol className={styles["breadcrumb-list"]}>
				{breadcrumbsExceptLast.map((item, index) => (
					<BreadcrumbItem key={index} {...item} isCurrentPage={false} />
				))}
				{lastBreadcrumb && (
					<BreadcrumbItem
						key={breadcrumbsExceptLast.length}
						{...lastBreadcrumb}
						isCurrentPage
					/>
				)}
			</ol>
		</nav>
	);
};

export { Breadcrumbs };
