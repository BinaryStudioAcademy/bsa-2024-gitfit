import { PageLayout } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { DeleteAccount, EditUserForm } from "./components/components.js";
import styles from "./styles.module.css";

const Profile = (): JSX.Element => {
	const { authenticatedUser } = useAppSelector(({ auth }) => auth);

	return (
		<PageLayout>
			<div className={styles["profile-content"]}>
				<div className={styles["profile-update"]}>
					<h1 className={styles["title"]}>Profile</h1>
					<EditUserForm user={authenticatedUser as UserAuthResponseDto} />
				</div>
				<div className={styles["divider"]} />
				{authenticatedUser?.id && (
					<DeleteAccount userId={authenticatedUser.id} />
				)}
			</div>
		</PageLayout>
	);
};

export { Profile };
