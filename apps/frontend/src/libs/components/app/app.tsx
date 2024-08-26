import {
	Header,
	Link,
	Loader,
	RouterOutlet,
	Sidebar,
	Table,
} from "~/libs/components/components.js";
import {
	mockColumns as mockTableColumns,
	mockData as mockTableData,
	type Person,
} from "~/libs/components/table/mock-data.js";
import { SIDEBAR_ITEMS } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

const App = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const dataStatus = useAppSelector(({ users }) => users.dataStatus);
	const users = useAppSelector(({ users }) => users.users);

	const isRoot = pathname === AppRoute.ROOT;
	const isLoading = dataStatus === "pending";

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

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
			{/* TODO: Delete inline styles after implementation */}
			<main style={{ display: "flex", flex: "1" }}>
				<Sidebar items={SIDEBAR_ITEMS} />
				<div>
					<p>Current path: {pathname}</p>

					<div>
						<RouterOutlet />
					</div>
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
				</div>
			</main>
		</>
	);
};

export { App };
