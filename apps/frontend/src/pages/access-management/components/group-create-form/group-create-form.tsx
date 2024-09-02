import { Button, Input, Table } from "~/libs/components/components.js";
import { useAppForm, useCallback, useState } from "~/libs/hooks/hooks.js";
import { type TableColumn } from "~/libs/types/types.js";
import {
	type GroupCreateRequestDto,
	groupCreateValidationSchema,
} from "~/modules/groups/groups.js";

import { type UserRow } from "../../libs/types/types.js";
import { DEFAULT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: GroupCreateRequestDto) => void;
	users: {
		userColumns: TableColumn<UserRow>[];
		userData: UserRow[];
	};
};

const GroupCreateForm = ({ onSubmit, users }: Properties): JSX.Element => {
	const { control, errors, handleSubmit, setValue } =
		useAppForm<GroupCreateRequestDto>({
			defaultValues: DEFAULT_GROUP_CREATE_PAYLOAD,
			validationSchema: groupCreateValidationSchema,
		});

	const [, setSelectedUserIds] = useState<number[]>([]);

	const handleUserSelect = useCallback(
		(userId: number, isSelected: boolean) => {
			setSelectedUserIds((previousIds) => {
				const updatedIds = isSelected
					? [...previousIds, userId]
					: previousIds.filter((id) => id !== userId);
				setValue("userIds", updatedIds);

				return updatedIds;
			});
		},
		[setValue],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData: GroupCreateRequestDto) => {
				onSubmit({
					name: formData.name,
					permissionIds: [],
					userIds: formData.userIds
						.map((selectedId) => users.userData[selectedId]?.id)
						.filter((id) => id !== undefined),
				});
			})(event_);
		},
		[handleSubmit, onSubmit, users.userData],
	);

	return (
		<form className={styles["form-wrapper"]} onSubmit={handleFormSubmit}>
			<Input
				autoComplete="given-name"
				control={control}
				errors={errors}
				label="Name"
				name="name"
			/>
			<h2 className={styles["section-title"]}>Users</h2>
			<Table<UserRow>
				columns={users.userColumns}
				data={users.userData}
				onRowSelect={handleUserSelect}
			/>
			<div className={styles["button-wrapper"]}>
				<Button label="Create" type="submit" />
			</div>
		</form>
	);
};

export { GroupCreateForm };
