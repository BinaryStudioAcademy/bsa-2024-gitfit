import { GroupCreateForm } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import {
	actions as groupActions,
	type GroupCreateRequestDto,
	groupCreateValidationSchema,
} from "~/modules/groups/groups.js";
import { actions as permissionActions } from "~/modules/permissions/permissions.js";

import { DEFAULT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";

type Properties = {
	onSubmit: (payload: GroupCreateRequestDto) => void;
};

const AccessGroupCreateForm = ({ onSubmit }: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const {
		permissions,
		permissionsDataStatus,
		users,
		usersDataStatus,
		usersTotalCount,
	} = useAppSelector(({ groups, permissions }) => ({
		permissions: permissions.permissions,
		permissionsDataStatus: permissions.dataStatus,
		users: groups.users,
		usersDataStatus: groups.usersDataStatus,
		usersTotalCount: groups.usersTotalCount,
	}));

	const usersPagination = usePagination({
		queryParameterPrefix: "group-user",
		totalItemsCount: usersTotalCount,
	});
	const { page, pageSize } = usersPagination;

	useEffect(() => {
		void dispatch(permissionActions.loadAll());
	}, [dispatch]);

	useEffect(() => {
		void dispatch(groupActions.loadUsers({ page, pageSize }));
	}, [dispatch, page, pageSize]);

	const isLoading = [usersDataStatus, permissionsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

	return (
		<GroupCreateForm
			defaultValues={DEFAULT_GROUP_CREATE_PAYLOAD}
			isLoading={isLoading}
			onSubmit={onSubmit}
			permissions={permissions}
			users={users}
			usersPagination={usersPagination}
			usersTotalCount={usersTotalCount}
			validationSchema={groupCreateValidationSchema}
		/>
	);
};

export { AccessGroupCreateForm };
