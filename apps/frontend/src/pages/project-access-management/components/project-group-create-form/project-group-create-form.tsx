import { GroupCreateForm } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import {
	type ProjectGroupCreateRequestDto,
	projectGroupCreateValidationSchema,
	type ProjectGroupGetAllItemResponseDto,
	actions as projectGroupsActions,
} from "~/modules/project-groups/project-groups.js";
import { actions as projectPermissionsActions } from "~/modules/project-permissions/project-permissions.js";

import { DEFAULT_PROJECT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";
import { getUsersFromProjectGroups } from "./libs/helpers/helpers.js";

type Properties = {
	onSubmit: (payload: ProjectGroupCreateRequestDto) => void;
	projectGroups: ProjectGroupGetAllItemResponseDto[];
	projectId: number;
};

const ProjectGroupCreateForm = ({
	onSubmit,
	projectGroups,
	projectId,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const {
		projectPermissions,
		projectPermissionsDataStatus,
		users,
		usersDataStatus,
		usersTotalCount,
	} = useAppSelector(({ projectGroups, projectPermissions }) => ({
		projectPermissions: projectPermissions.projectPermissions,
		projectPermissionsDataStatus: projectPermissions.dataStatus,
		users: projectGroups.users,
		usersDataStatus: projectGroups.usersDataStatus,
		usersTotalCount: projectGroups.usersTotalCount,
	}));

	const usersPagination = usePagination({
		queryParameterPrefix: "project-group-user",
		totalItemsCount: usersTotalCount,
	});
	const { page, pageSize } = usersPagination;

	const projectUsers = getUsersFromProjectGroups(projectGroups);
	const usersWithGroups = users.map((user) => {
		const { groups = [] } = projectUsers.find(({ id }) => id === user.id) ?? {};

		return {
			...user,
			groups,
		};
	});

	useEffect(() => {
		void dispatch(projectPermissionsActions.loadAll());
	}, [dispatch]);

	useEffect(() => {
		void dispatch(projectGroupsActions.loadUsers({ page, pageSize }));
	}, [dispatch, page, pageSize]);

	const isLoading = [usersDataStatus, projectPermissionsDataStatus].some(
		(status) => status === DataStatus.IDLE || status === DataStatus.PENDING,
	);

	return (
		<GroupCreateForm<ProjectGroupCreateRequestDto>
			defaultValues={{
				...DEFAULT_PROJECT_GROUP_CREATE_PAYLOAD,
				projectId,
			}}
			isLoading={isLoading}
			onSubmit={onSubmit}
			permissions={projectPermissions}
			submitLabel="Submit"
			users={usersWithGroups}
			usersPagination={usersPagination}
			usersTotalCount={usersTotalCount}
			validationSchema={projectGroupCreateValidationSchema}
		/>
	);
};

export { ProjectGroupCreateForm };
