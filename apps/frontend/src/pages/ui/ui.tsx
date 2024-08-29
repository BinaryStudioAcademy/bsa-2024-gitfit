import {
	Breadcrumbs,
	Modal,
	Select,
	Table,
	TablePagination,
} from "~/libs/components/components.js";
import {
	mockColumns as mockTableColumns,
	mockData as mockTableData,
	type Person,
} from "~/libs/components/table/mock-data.js";
import {
	useAppDispatch,
	useAppForm,
	useEffect,
	useModal,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";
import { actions as userActions } from "~/modules/users/users.js";

const TABLE_TOTAL_ITEMS_COUNT = 100;

const Ui = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { control } = useAppForm({
		defaultValues: {
			options: [],
		},
	});

	const modal = useModal();

	useEffect(() => {
		void dispatch(userActions.loadAll());
	}, [dispatch]);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		totalItemsCount: TABLE_TOTAL_ITEMS_COUNT,
	});

	return (
		<>
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
			<Table<Person> columns={mockTableColumns} data={mockTableData} />
			<Modal title="Title" {...modal}>
				children
			</Modal>
			<Breadcrumbs
				items={[
					{ href: "/ui", label: "Home" },
					{ href: "/", label: "projects" },
					{ href: "/sign-up", label: "projectname" },
					{ label: "project details" },
				]}
			/>

			<TablePagination
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				page={page}
				pageSize={pageSize}
				totalItemsCount={TABLE_TOTAL_ITEMS_COUNT}
			/>
		</>
	);
};

export { Ui };
