import { Loader, PageLayout } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/data-status.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { EditUserForm } from "./components/components.js";
import styles from "./styles.module.css";

const Profile = (): JSX.Element => {
	const { authenticatedUser, dataStatus } = useAppSelector(({ auth }) => auth);

	if (!authenticatedUser) {
		return <></>;
	}

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	return (
		<PageLayout>
			<div className={styles["profile-content"]}>
				<h1 className={styles["label"]}>Profile</h1>

				{isLoading ? (
					<div className={styles["profile-loader"]}>
						<Loader />
					</div>
				) : (
					<EditUserForm
						defaultValues={authenticatedUser}
						userId={authenticatedUser.id}
					/>
				)}
			</div>
		</PageLayout>
	);
};

export { Profile };
