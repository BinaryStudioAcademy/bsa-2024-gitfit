import { Icon } from "~/libs/components/components.js";
import { type BreadcrumbNavigationItem } from "~/libs/components/types/breadcrumb-navigation-item.type.js";

import styles from "./styles.module.css";

type Properties = {
	isLastItem: boolean;
} & BreadcrumbNavigationItem;

const BreadcrumbItem = ({
	href,
	isLastItem,
	label,
}: Properties): JSX.Element => {
	return (
		<li className={styles["breadcrumb-item"]}>
			{isLastItem ? (
				<span aria-label={label} className={styles["breadcrumb-current"]}>
					{label}
				</span>
			) : (
				<a aria-label={label} className={styles["breadcrumb-link"]} href={href}>
					{label}
				</a>
			)}
			{!isLastItem && (
				<span className={styles["breadcrumb-separator"]}>
					<Icon height={11} name="rightArrow" width={7} />
				</span>
			)}
		</li>
	);
};

export { BreadcrumbItem };
