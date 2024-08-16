import React, { useCallback, useState } from "react";

import reactLogo from "~/assets/images/react.svg";
import { Link, RouterOutlet } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

import { Modal } from "../modal/modal.js"; // Ensure this path is correct

const App = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const dataStatus = useAppSelector(({ users }) => users.dataStatus);
	const users = useAppSelector(({ users }) => users.users);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	// Functions to open and close the modal
	const openModal = useCallback((): void => {
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback((): void => {
		setIsModalOpen(false);
	}, []);

	return (
		<>
			<img alt="logo" src={reactLogo} width="30" />

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

			{/* Button to open the modal */}
			<button onClick={openModal}>Open Modal</button>

			{/* Conditionally render the modal */}
			{isModalOpen && (
				<Modal onClose={closeModal} title="Test Modal">
					<p>This is a test modal content.</p>
				</Modal>
			)}

			{isRoot && (
				<>
					<h2>Users:</h2>
					<h3>Status: {dataStatus}</h3>
					<ul>
						{users.map((user) => (
							<li key={user.id}>{user.email}</li>
						))}
					</ul>
				</>
			)}
		</>
	);
};

export { App };
