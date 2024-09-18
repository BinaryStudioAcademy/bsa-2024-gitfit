import { Button, Input, Loader, Select } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useMemo,
	useSelectedItems,
} from "~/libs/hooks/hooks.js";
import { type ValidationSchema } from "~/libs/types/types.js";
import {
	type ProjectGroupCreateRequestDto,
	type ProjectGroupPatchRequestDto,
} from "~/modules/project-groups/project-groups.js";
import { actions as projectPermissionActions } from "~/modules/project-permissions/project-permissions.js";

import { ProjectGroupUsersTable } from "../project-group-users-table/project-group-users-table.js";
import { getPermissionOptions } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type ProjectGroupRequest =
	| ProjectGroupCreateRequestDto
	| ProjectGroupPatchRequestDto;

type Properties<T extends ProjectGroupRequest> = {
	defaultValues: T;
	onSubmit: (payload: T) => void;
	submitLabel: string;
	validationSchema: ValidationSchema<T>;
};

const ProjectGroupForm = <T extends ProjectGroupRequest>({
	defaultValues,
	onSubmit,
	submitLabel,
	validationSchema,
}: Properties<T>): JSX.Element => {
	const dispatch = useAppDispatch();

	const { control, errors, handleErrorsClear, handleSubmit, handleValueSet } =
		useAppForm<ProjectGroupRequest>({
			defaultValues,
			validationSchema,
		});

	const { dataStatus: projectPermissionsDataStatus, projectPermissions } =
		useAppSelector(({ projectPermissions }) => projectPermissions);

	const { items: selectedUserIds, onToggle: handleUserIdsToggle } =
		useSelectedItems<number>(defaultValues.userIds);

	useEffect(() => {
		void dispatch(projectPermissionActions.loadAll());
	}, [dispatch]);

	useEffect(() => {
		if (errors["userIds"] && selectedUserIds.length > EMPTY_LENGTH) {
			handleErrorsClear("userIds");
		}
	}, [selectedUserIds, errors, handleErrorsClear]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: ProjectGroupRequest) => {
				onSubmit(formData as T);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	const permissionOptions = useMemo(
		() => getPermissionOptions(projectPermissions),
		[projectPermissions],
	);

	const isLoading =
		projectPermissionsDataStatus === DataStatus.IDLE ||
		projectPermissionsDataStatus === DataStatus.PENDING;

	if (isLoading) {
		return <Loader />;
	}

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
			<Input
				autoComplete="given-name"
				control={control}
				errors={errors}
				label="Name"
				name="name"
			/>
			<ProjectGroupUsersTable
				errors={errors}
				onToggle={handleUserIdsToggle}
				selectedUserIds={selectedUserIds}
				setValue={handleValueSet}
			/>
			<Select
				control={control}
				isMulti
				label="Permissions"
				name="permissionIds"
				options={permissionOptions}
				placeholder="Choose project permissions"
			/>
			<div className={styles["button-wrapper"]}>
				<Button label={submitLabel} type="submit" />
			</div>
		</form>
	);
};

export { ProjectGroupForm };
