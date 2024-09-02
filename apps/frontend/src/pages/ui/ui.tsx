import {
	Breadcrumbs,
	ConfirmationModal,
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
	useCallback,
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

	const handleDeleteConfirm = useCallback(() => {
		modal.onModalClose();
	}, [modal]);

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
			<ConfirmationModal
				cancelLabel="Cancel"
				confirmationText="This group will be deleted. This action cannot be undone. Do you want to continue?"
				confirmLabel="Yes, Delete it"
				isModalOpened={modal.isModalOpened}
				onConfirm={handleDeleteConfirm}
				onModalClose={modal.onModalClose}
				title="Are you sure?"
			/>
			<Breadcrumbs
				items={[
					{ href: "/", label: "GitFit" },
					{ href: "/", label: "Projects" },
					{ label: "User Interface" },
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
