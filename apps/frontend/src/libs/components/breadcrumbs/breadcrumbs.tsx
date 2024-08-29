import { Icon } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type BreadcrumbItem = {
	href?: string;
	label: string;
};

type Properties = {
	items: BreadcrumbItem[];
};

const firstItemOffset = 0;
const lastItemOffset = -1;

const Breadcrumbs = ({ items }: Properties): JSX.Element => {
	const breadcrumbs = items;

	const breadcrumbsExceptLast = breadcrumbs.slice(
		firstItemOffset,
		lastItemOffset,
	);
	const lastBreadcrumb = breadcrumbs.slice(lastItemOffset);

	return (
		<nav aria-label="breadcrumb" className={styles["breadcrumb-container"]}>
			<ol className={styles["breadcrumb-list"]}>
				{breadcrumbsExceptLast.map(({ href, label }, index) => (
					<li className={styles["breadcrumb-item"]} key={index}>
						<a
							aria-label={label}
							className={styles["breadcrumb-link"]}
							href={href}
						>
							{label}
						</a>
						<span className={styles["breadcrumb-separator"]}>
							<Icon height={11} name="rightArrow" width={7} />
						</span>
					</li>
				))}
				{lastBreadcrumb.map(({ href, label }, index) => (
					<li
						className={styles["breadcrumb-item"]}
						key={breadcrumbsExceptLast.length + index}
					>
						{href ? (
							<a
								aria-label={label}
								className={styles["breadcrumb-link"]}
								href={href}
							>
								{label}
							</a>
						) : (
							<span aria-label={label} className={styles["breadcrumb-current"]}>
								{label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export { Breadcrumbs };
