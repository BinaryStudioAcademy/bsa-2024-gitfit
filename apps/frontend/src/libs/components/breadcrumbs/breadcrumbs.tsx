import { BreadcrumbItem } from "./libs/components/components.js";
import { type BreadcrumbNavigationItem } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	items: BreadcrumbNavigationItem[];
};

const ITEM_INDEX_OFFSET = 1;

const Breadcrumbs = ({ items }: Properties): JSX.Element => {
	return (
		<nav className={styles["breadcrumb-container"]}>
			<ol className={styles["breadcrumb-list"]}>
				{items.map((item, index) => (
					<BreadcrumbItem
						href={item.href}
						isLastItem={index === items.length - ITEM_INDEX_OFFSET}
						key={index}
						label={item.label}
					/>
				))}
			</ol>
		</nav>
	);
};

export { Breadcrumbs };
