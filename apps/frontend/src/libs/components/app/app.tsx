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
	usePagination,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

const App = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const [searchParameters, setSearchParameters] = useSearchParams();
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
	const TOTAL_ITEMS = 100;
	const DEFAULT_PAGE = 1; // Not sure where to put this
	const DEFAULT_PAGE_SIZE = 10; // Not sure where to put this

	// This solution still passes negative parameters values.
	// And there is no checks for page to be in range of totalPages
	// inside usePagination for now.
	// Also not sure where to store `"page"` and `"pageSize"` literal constants
	const pageQueryParameter =
		Number(searchParameters.get("page")) || DEFAULT_PAGE;
	const perPageQueryParameter =
		Number(searchParameters.get("pageSize")) || DEFAULT_PAGE_SIZE;

	const { onPageChange, onPerPageChange, page, perPage } = usePagination({
		pageQueryParameter,
		perPageQueryParameter,
		totalItems: TOTAL_ITEMS,
	});

	const handlePerPageChange = useCallback(
		(event: React.FormEvent<HTMLSelectElement>) => {
			onPerPageChange(Number(event.currentTarget.value));
		},
		[onPerPageChange],
	);

	useEffect(() => {
		setSearchParameters({ page: String(page), pageSize: String(perPage) });
	}, [page, perPage, setSearchParameters]);
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
						onPageChange={onPageChange}
						onPerPageChange={handlePerPageChange}
						page={page}
						perPage={perPage}
						totalItems={TOTAL_ITEMS}
					/>
				</>
			)}
		</>
	);
};

export { App };
