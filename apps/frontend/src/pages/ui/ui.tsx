import { Modal, Select, Table } from "~/libs/components/components.js";
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
} from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";
import { actions as userActions } from "~/modules/users/users.js";

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
		</>
	);
};

export { Ui };
