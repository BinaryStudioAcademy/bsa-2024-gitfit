import { useCallback, useState } from "react";

import {
	Header,
	Link,
	Loader,
	RouterOutlet,
	Table,
} from "~/libs/components/components.js";
import {
	mockColumns as mockTableColumns,
	mockData as mockTableData,
	type Person,
} from "~/libs/components/table/mock-data.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { Modal } from "../modal/modal.js";

const App = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const dataStatus = useAppSelector(({ users }) => users.dataStatus);
	const users = useAppSelector(({ users }) => users.users);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isRoot = pathname === AppRoute.ROOT;
	const isLoading = dataStatus === "pending";

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	const openModal = useCallback((): void => {
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback((): void => {
		setIsModalOpen(false);
	}, []);

	return (
		<>
			<Header />
			<ul>
				<li>
					<Link to={AppRoute.ROOT}>Root</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_IN}>Sign in</Link>
				</li>
				<li>
					<Link to={AppRoute.SIGN_UP}>Sign up</Link>
				</li>
			</ul>
			<p>Current path: {pathname}</p>

			<div>
				<RouterOutlet />
			</div>

			<button onClick={openModal}>Open Modal</button>

			{isModalOpen && (
				<Modal onClose={closeModal} open={isModalOpen} title="Test Modal">
					<p>This is a test modal content.</p>
				</Modal>
			)}

			{isRoot && (
				<>
					<h2>Users:</h2>
					<h3>Status: {dataStatus}</h3>

					{isLoading ? (
						<Loader />
					) : (
						<ul>
							{users.map((user) => (
								<li key={user.id}>{user.email}</li>
							))}
						</ul>
					)}
					<Table<Person> columns={mockTableColumns} data={mockTableData} />
				</>
			)}
		</>
	);
};

export { App };
