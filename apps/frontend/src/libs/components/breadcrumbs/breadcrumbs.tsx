import { Icon } from "~/libs/components/components.js";
import { useLocation } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const FIRST_ITEM_INDEX = 0;
const SINGLE_ITEM_OFFSET = 1;

const formatBreadcrumbName = (name: string): string => {
	return name
		.replaceAll("-", " ")
		.replaceAll(/\b\w/g, (char) => char.toUpperCase()); // Title Case
};

type BreadcrumbItem = {
	link?: string;
	name: string;
};

type Properties = {
	items?: BreadcrumbItem[];
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
		<nav aria-label="breadcrumb" className={styles["breadcrumbContainer"]}>
			<ol className={styles["breadcrumbList"]}>
				{breadcrumbs.map((item, index) => {
					const isLastItem = index === breadcrumbs.length - SINGLE_ITEM_OFFSET;

					return (
						<li className={styles["breadcrumbItem"]} key={index}>
							{isLastItem ? (
								<span className={styles["breadcrumbCurrent"]}>{item.name}</span>
							) : (
								<a className={styles["breadcrumbLink"]} href={item.link}>
									{item.name}
								</a>
							)}
							{!isLastItem && (
								<span className={styles["breadcrumbSeparator"]}>
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
