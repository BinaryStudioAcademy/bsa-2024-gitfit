import { Icon } from "~/libs/components/components.js";

import { type BreadcrumbNavigationItem } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = {
	isLastItem: boolean;
} & BreadcrumbNavigationItem;

const BreadcrumbItem = ({
	href,
	isLastItem,
	label,
}: Properties): JSX.Element => {
	const hasHref = Boolean(href);

	return (
		<li className={styles["breadcrumb-item"]}>
			{hasHref ? (
				<a className={styles["breadcrumb-link"]} href={href}>
					{label}
				</a>
			) : (
				<span className={styles["breadcrumb-current"]}>{label}</span>
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
