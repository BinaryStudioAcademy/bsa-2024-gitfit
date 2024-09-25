import { Header, Loader, Sidebar } from "~/libs/components/components.js";
import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isLoading?: boolean;
};

const PageLayout = ({
	children,
	isLoading = false,
}: Properties): JSX.Element => {
	const { projectUserPermissions, userPermissions } = useAppSelector(
		({ auth }) => auth,
	);
	const projectPermissions = Object.values(projectUserPermissions).flat();

	return (
		<div className={styles["page"]}>
			<div className={styles["page-header"]}>
				<Header />
			</div>
			<div className={styles["page-body"]}>
				<aside className={styles["page-sidebar"]}>
					<Sidebar
						items={SIDEBAR_ITEMS}
						projectPermissions={projectPermissions}
						userPermissions={userPermissions}
					/>
				</aside>
				<main className={styles["page-content"]}>
					{isLoading ? <Loader /> : <>{children}</>}
				</main>
			</div>
		</div>
	);
};

export { PageLayout };
