import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Checkbox } from "~/libs/components/components.js";
import { type TableColumn } from "~/libs/types/types.js";
import { getUserColumns } from "~/pages/project-access-management/libs/helpers/helpers.js";
import { type UserRow } from "~/pages/project-access-management/libs/types/types.js";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	name: FieldPath<T>;
};

const getProjectUserColumns = <T extends FieldValues>({
	control,
	errors,
	name,
}: Properties<T>): TableColumn<UserRow>[] => {
	const userColumns = getUserColumns();

	return [
		{
			cell: ({ row }) => (
				<Checkbox
					control={control}
					errors={errors}
					isErrorHidden
					isLabelHidden
					label="User"
					listKey={row.original.id}
					name={name}
				/>
			),
			id: "checkbox",
		},
		...userColumns,
	];
};

export { getProjectUserColumns };
