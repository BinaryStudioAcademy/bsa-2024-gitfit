import { PageLayout } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { DeleteAccount, EditUserForm } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Profile = (): JSX.Element => {
	const { authenticatedUser } = useAppSelector(({ auth }) => auth);
	const user = authenticatedUser as UserAuthResponseDto;

	return (
		<PageLayout>
			<div className={styles["profile-layout"]}>
				<div className={styles["profile-info"]}>
					<h1 className={styles["title"]}>Profile</h1>
					<EditUserForm user={user} />
				</div>
				<div className={styles["divider"]} />
				<DeleteAccount />
			</div>
		</PageLayout>
	);
};

export { Profile };
