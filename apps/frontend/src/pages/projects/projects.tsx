import {
	Header,
	Loader,
	Modal,
	Select,
	Sidebar,
	Table,
	TablePagination,
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
	useAppForm,
	useAppSelector,
	useEffect,
	useLocation,
	useModal,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";
import { actions as userActions } from "~/modules/users/users.js";

const Projects = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const dataStatus = useAppSelector(({ users }) => users.dataStatus);
	const users = useAppSelector(({ users }) => users.users);
	const { isModalOpened, onModalClose, onModalOpen } = useModal();

	const isRoot = pathname === AppRoute.ROOT;
	const isLoading = dataStatus === "pending";

	const { control } = useAppForm({
		defaultValues: {
			options: [],
		},
	});

	const TABLE_TOTAL_ITEMS = 100;
	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		totalItems: TABLE_TOTAL_ITEMS,
	});

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	return (
		<>
			<Header />
			<p>Current path: {pathname}</p>

			{/* TODO: Delete inline styles after implementation */}
			<main style={{ display: "flex", flex: "1" }}>
				<Sidebar items={SIDEBAR_ITEMS} />
				{/* TODO: Delete inline styles after implementation */}
				<div style={{ display: "flex", flexDirection: "column" }}>
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
								onPageSizeChange={onPageSizeChange}
								page={page}
								pageSize={pageSize}
								totalItems={TABLE_TOTAL_ITEMS}
							/>
						</>
					)}
					<Select<
						{
							options: SelectOption<number>[];
						},
						number
					>
						control={control}
						isMulti
						label="Options"
						name="options"
						options={[]}
					/>
				</div>

				<button onClick={onModalOpen}>Open Modal</button>

				<Modal
					isModalOpened={isModalOpened}
					onModalClose={onModalClose}
					title="Test Modal"
				>
					<p>This is a test modal content.</p>
					<Table<Person> columns={mockTableColumns} data={mockTableData} />
					<Select<
						{
							options: SelectOption<number>[];
						},
						number
					>
						control={control}
						isMulti
						label="Options"
						name="options"
						options={[]}
					/>
				</Modal>
			</main>
		</>
	);
};

export { Projects };
