import { useCallback, useEffect } from "react";
import { type Control, type FieldPath } from "react-hook-form";

import {
	Loader,
	Table,
	TablePagination,
} from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useFormController,
	usePagination,
} from "~/libs/hooks/hooks.js";
import { actions as groupActions } from "~/modules/groups/groups.js";

import {
	getGroupUserColumns,
	getGroupUserRows,
} from "../../helpers/helpers.js";
import { type GroupUserRow } from "../../types/types.js";

type Properties<T extends object> = {
	control: Control<T, null>;
	name: FieldPath<T>;
};

const GroupUsersTable = <T extends object>({
	control,
	name,
}: Properties<T>): JSX.Element => {
	const dispatch = useAppDispatch();

	const { field } = useFormController({ control, name });

	const {
		dataStatus,
		items: users,
		totalCount,
	} = useAppSelector(({ groups }) => groups.users);

	const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
		queryParameterPrefix: "user",
		totalItemsCount: totalCount,
	});

	useEffect(() => {
		void dispatch(groupActions.configureGroupUsers({ page, pageSize }));
	}, [dispatch, page, pageSize]);

	const handleUserSelect = useCallback(
		(userIds: number[]) => {
			field.onChange(userIds);
		},
		[field],
	);

	const isLoading =
		dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

	if (isLoading) {
		return <Loader />;
	}

	const userColumns = getGroupUserColumns();
	const userData: GroupUserRow[] = getGroupUserRows(users);

	return (
		<>
			<Table<GroupUserRow>
				columns={userColumns}
				data={userData}
				name="userIds"
				onSelect={handleUserSelect}
				selectedIds={field.value}
			/>
			<TablePagination
				onPageChange={onPageChange}
				onPageSizeChange={onPageSizeChange}
				page={page}
				pageSize={pageSize}
				totalItemsCount={totalCount}
			/>
		</>
	);
};

export { GroupUsersTable };
