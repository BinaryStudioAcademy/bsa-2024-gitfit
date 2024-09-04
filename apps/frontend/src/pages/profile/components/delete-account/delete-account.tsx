import { Button } from "~/libs/components/components.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import styles from "./styles.module.css";

type Properties = {
	user: UserAuthResponseDto;
};

const DeleteAccount = ({ user }: Properties): JSX.Element => {
	return (
		<div className={styles["profile-delete"]}>
			<h2 className={styles["delete-title"]}>Delete account {user.name}</h2>
			<p className={styles["delete-text"]}>This action cannot be undone.</p>
			<Button label="Delete Your Account" variant="danger" />
		</div>
	);
};

export { DeleteAccount };
