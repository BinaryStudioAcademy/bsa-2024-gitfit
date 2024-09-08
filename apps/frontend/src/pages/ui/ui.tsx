import {
	Breadcrumbs,
	Button,
	Modal,
	Select,
	Table,
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
} from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";
import { actions as projectApiKey } from "~/modules/project-api-keys/project-api-keys.js";
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
		void dispatch(userActions.loadAll({ page: 1, pageSize: 10 }));
	}, [dispatch]);

	const handleGenerateApiKey = useCallback(() => {
		void dispatch(
			projectApiKey.create({
				projectId: 1,
				userId: 1,
			}),
		);
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
			<Breadcrumbs
				items={[
					{ href: "/", label: "GitFit" },
					{ href: "/", label: "Projects" },
					{ label: "User Interface" },
				]}
			/>
			<Button label="Generate API key" onClick={handleGenerateApiKey} />
		</>
	);
};

export { Ui };
