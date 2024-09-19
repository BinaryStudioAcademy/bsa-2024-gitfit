import { PageLayout, Table } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as contributorActions } from "~/modules/contributors/contributors.js";

import {
	getContributorColumns,
	getContributorRows,
} from "./libs/helpers/helpers.js";
import { type ContributorRow } from "./libs/types/types.js";
import styles from "./styles.module.css";

const Contributors = (): JSX.Element => {
	const { contributors, dataStatus } = useAppSelector(
		({ contributors }) => contributors,
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(contributorActions.loadAll());
	}, [dispatch]);

	const contributorsColumns = getContributorColumns();
	const contributorsData = getContributorRows(contributors);

	const isLoading =
		dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

	return (
		<PageLayout isLoading={isLoading}>
			<h1 className={styles["title"]}>Contributors</h1>
			<section className={styles["contributors-table"]}>
				<Table<ContributorRow>
					columns={contributorsColumns}
					data={contributorsData}
					isFullHeight
				/>
			</section>
		</PageLayout>
	);
};

export { Contributors };
