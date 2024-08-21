import reactLogo from "~/assets/images/react.svg";
import {
	Link,
	Loader,
	RouterOutlet,
	Table,
	TablePagination,
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
	useCallback,
	useEffect,
	useLocation,
	useTablePagination,
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

	// TODO: remove following lines and TablePagination component usage after its visual testing
	// ===>
	const TOTAL_ITEMS = 100; // Temp mock data
	const STARTING_PAGE = 1; // Temp mock data
	const STARTING_ROWS_PER_PAGE = 10; // Temp mock data

	const {
		changeRowsPerPage,
		openFirstPage: handleFirstPageClick,
		openLastPage: handleLastPageClick,
		openNextPage: handleNextPageClick,
		openPreviousPage: handlePreviousPageClick,
		page,
		rowsPerPage,
	} = useTablePagination({
		startingPage: STARTING_PAGE,
		startingRowsPerPage: STARTING_ROWS_PER_PAGE,
		totalItems: TOTAL_ITEMS,
	});

	const handleRowsPerPageChange = useCallback(
		(event: React.FormEvent<HTMLSelectElement>) => {
			changeRowsPerPage(Number(event.currentTarget.value));
		},
		[changeRowsPerPage],
	);
	// <===

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
					<TablePagination
						onFirstPageClick={handleFirstPageClick}
						onLastPageClick={handleLastPageClick}
						onNextPageClick={handleNextPageClick}
						onPreviousPageClick={handlePreviousPageClick}
						onRowsPerPageChange={handleRowsPerPageChange}
						page={page}
						rowsPerPage={rowsPerPage}
						totalItems={TOTAL_ITEMS}
					/>
				</>
			)}
		</>
	);
};

export { App };
