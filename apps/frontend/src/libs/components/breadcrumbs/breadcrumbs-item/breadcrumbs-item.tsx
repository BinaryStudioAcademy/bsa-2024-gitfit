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
				<span className={styles["breadcrumb-current"]}>{label}</span>
			) : (
				<a className={styles["breadcrumb-link"]} href={href}>
					{label}
				</a>
			)}
			{!isLastItem && (
				<span className={styles["breadcrumb-separator"]}>
					<Icon height={20} name="rightArrow" width={20} />
				</span>
			)}
		</li>
	);
};

export { BreadcrumbItem };
