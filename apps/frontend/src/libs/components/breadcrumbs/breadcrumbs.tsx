import { Icon } from "~/libs/components/components.js";
import { getBreadcrumbName } from "~/libs/helpers/helpers.js";
import { useLocation } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type BreadcrumbItem = {
	link?: string;
	name: string;
};

type Properties = {
	items?: BreadcrumbItem[];
};

const FIRST_ITEM_INDEX = 0;
const LAST_ITEM_OFFSET = -1;
const SINGLE_ITEM_OFFSET = 1;

const Breadcrumbs = ({ items }: Properties): JSX.Element => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter(Boolean);

	const generatedItems = pathnames.map((currentPathname, index) => {
		const link = `/${pathnames.slice(FIRST_ITEM_INDEX, index + SINGLE_ITEM_OFFSET).join("/")}`;

		return {
			link,
			name: getBreadcrumbName(currentPathname),
		};
	});

	const breadcrumbs = items || generatedItems;
	const breadcrumbsExceptLast = breadcrumbs.slice(
		FIRST_ITEM_INDEX,
		LAST_ITEM_OFFSET,
	);
	const lastBreadcrumb = breadcrumbs.slice(LAST_ITEM_OFFSET);

	return (
		<nav aria-label="breadcrumb" className={styles["breadcrumb-container"]}>
			<ol className={styles["breadcrumb-list"]}>
				{breadcrumbsExceptLast.map(({ link, name }, index) => (
					<li className={styles["breadcrumb-item"]} key={index}>
						<a className={styles["breadcrumb-link"]} href={link}>
							{name}
						</a>
						<span className={styles["breadcrumb-separator"]}>
							<Icon height={20} name="rightArrow" width={20} />
						</span>
					</li>
				))}
				{lastBreadcrumb.map(({ name }, index) => (
					<li
						className={styles["breadcrumb-item"]}
						key={breadcrumbsExceptLast.length + index}
					>
						<span className={styles["breadcrumb-current"]}>{name}</span>
					</li>
				))}
			</ol>
		</nav>
	);
};

export { Breadcrumbs };
