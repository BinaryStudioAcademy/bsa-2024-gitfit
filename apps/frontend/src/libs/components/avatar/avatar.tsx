import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { Loader } from "../components.js";
import styles from "./styles.module.css";

const Avatar = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(({ users }) => users.users);
	const dataStatus = useAppSelector(({ users }) => users.dataStatus);
	const isLoading = dataStatus === "pending";
	const ZERO = 0;

	useEffect(() => {
		void dispatch(userActions.loadAll());
	}, [dispatch]);

	return (
		<div className={styles["avatar"]}>
			{isLoading ? (
				<Loader />
			) : (
				<span className={styles["avatar_letter"]}>
					{users[ZERO]?.email[ZERO]}
				</span>
			)}
		</div>
	);
};

export { Avatar };
