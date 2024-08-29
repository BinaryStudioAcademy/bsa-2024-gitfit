import { Icon } from "~/libs/components/components.js";
import { type BreadcrumbItemType } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	isCurrentPage: boolean;
} & BreadcrumbItemType;

const BreadcrumbItem = ({
	href,
	isCurrentPage,
	label,
}: Properties): JSX.Element => {
	return (
		<li className={styles["breadcrumb-item"]}>
			{href && !isCurrentPage ? (
				<a aria-label={label} className={styles["breadcrumb-link"]} href={href}>
					{label}
				</a>
			) : (
				<span aria-label={label} className={styles["breadcrumb-current"]}>
					{label}
				</span>
			)}
			{!isCurrentPage && (
				<span className={styles["breadcrumb-separator"]}>
					<Icon height={11} name="rightArrow" width={7} />
				</span>
			)}
		</li>
	);
};

export { BreadcrumbItem };
