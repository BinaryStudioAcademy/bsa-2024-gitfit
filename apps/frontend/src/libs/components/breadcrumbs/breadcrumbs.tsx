import { Icon } from "~/libs/components/components.js";
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
const SINGLE_ITEM_OFFSET = 1;

const formatBreadcrumbName = (name: string): string => {
	return (
		name
			.replaceAll("-", " ")
			// eslint-disable-next-line unicorn/prefer-string-replace-all
			.replace(/\b\w/g, (char) => char.toUpperCase())
	); // Title Case
};

const Breadcrumbs = ({ items }: Properties): JSX.Element => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter(Boolean);

	const generatedItems = pathnames.map((_, index) => {
		const currentPathname = pathnames[index];
		const link = `/${pathnames.slice(FIRST_ITEM_INDEX, index + SINGLE_ITEM_OFFSET).join("/")}`;

		return {
			link,
			name: currentPathname ? formatBreadcrumbName(currentPathname) : "",
		};
	});

	const breadcrumbs = items || generatedItems;

	return (
		<nav aria-label="breadcrumb" className={styles["breadcrumb-container"]}>
			<ol className={styles["breadcrumb-list"]}>
				{breadcrumbs.map((item, index) => {
					const isLastItem = index === breadcrumbs.length - SINGLE_ITEM_OFFSET;

					return (
						<li className={styles["breadcrumb-item"]} key={index}>
							{isLastItem ? (
								<span className={styles["breadcrumb-current"]}>
									{item.name}
								</span>
							) : (
								<a className={styles["breadcrumb-link"]} href={item.link}>
									{item.name}
								</a>
							)}
							{!isLastItem && (
								<span className={styles["breadcrumb-separator"]}>
									<Icon
										color="var(--color-border-primary)"
										height={20}
										name="lessThan"
										width={20}
									/>
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export { Breadcrumbs };
