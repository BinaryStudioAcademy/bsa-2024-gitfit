import {
	Button,
	Input,
	Loader,
	Select,
	Table,
	TablePagination,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	usePagination,
} from "~/libs/hooks/hooks.js";
import {
	type ProjectGroupCreateRequestDto,
	projectGroupCreateValidationSchema,
	type ProjectGroupGetAllItemResponseDto,
} from "~/modules/project-groups/project-groups.js";
import { actions as projectPermissionsActions } from "~/modules/project-permissions/project-permissions.js";

import { getUserFromRows } from "../../libs/helpers/get-user-form-rows.helper.js";
import { DEFAULT_PROJECT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";
import {
	getProjectPermissionOptions,
	getProjectUserColumns,
} from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties = {
	data: ProjectGroupGetAllItemResponseDto[];
	onSubmit: (payload: ProjectGroupCreateRequestDto) => void;
	projectId: number;
};

const ProjectGroupCreateForm = ({
	data,
	onSubmit,
	projectId,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit } =
		useAppForm<ProjectGroupCreateRequestDto>({
			defaultValues: {
				...DEFAULT_PROJECT_GROUP_CREATE_PAYLOAD,
				projectId,
			},
			validationSchema: projectGroupCreateValidationSchema,
		});

	const { dataStatus: permissionsDataStatus, projectPermissions } =
		useAppSelector(({ projectPermissions }) => projectPermissions);

	const { users, usersTotalCount } = useAppSelector(({ users }) => users);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		totalItemsCount: usersTotalCount,
	});

	const error = errors["userIds"]?.message;
	const hasError = Boolean(error);

	const columns = getProjectUserColumns({
		control,
		errors,
		name: "userIds",
	});

	// console.log(data);
	const userData = getUserFromRows(users, data);

	useEffect(() => {
		void dispatch(projectPermissionsActions.loadAll());
	}, [dispatch, page, pageSize]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: ProjectGroupCreateRequestDto) => {
				onSubmit(formData);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	const permissionOptions = useMemo(
		() => getProjectPermissionOptions(projectPermissions),
		[projectPermissions],
	);

	const isLoading =
		permissionsDataStatus === DataStatus.IDLE ||
		permissionsDataStatus === DataStatus.PENDING;

	if (isLoading) {
		return <Loader />;
	}

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
			<div className={styles["input-wrapper"]}>
				<Input
					autoComplete="group name"
					control={control}
					errors={errors}
					label="Name"
					name="name"
				/>
			</div>
			<div>Users</div>
			<Table columns={columns} data={userData} />
			<TablePagination
				background="secondary"
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				page={page}
				pageSize={pageSize}
				totalItemsCount={usersTotalCount}
			/>
			{hasError && (
				<span className={styles["checkbox-error"]}>{error as string}</span>
			)}
			<Select
				control={control}
				isMulti
				label="Permissions"
				name="permissionIds"
				options={permissionOptions}
				placeholder="Choose permissions for the group"
			/>
			<div className={styles["button-wrapper"]}>
				<Button label="Create" type="submit" />
			</div>
		</form>
	);
};

export { ProjectGroupCreateForm };
