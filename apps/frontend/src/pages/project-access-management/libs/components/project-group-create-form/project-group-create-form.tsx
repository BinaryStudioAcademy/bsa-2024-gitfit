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

import { filterUserProjectGroups } from "../../helpers/helpers.js";
import { ProjectGroupForm } from "../project-group-form/project-group-form.js";
import { DEFAULT_PROJECT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";

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

	const { users, usersTotalCount } = useAppSelector(({ projectGroups }) => ({
		projectGroups,
		users: projectGroups.users,
		usersTotalCount: projectGroups.usersTotalCount,
	}));

	const usersWithCurrentProjectGroups = filterUserProjectGroups(
		users,
		projectGroups,
	);

	const { page: userPage, pageSize: userPageSize } = usePagination({
		queryParameterPrefix: "project-group-user",
		totalItemsCount: usersTotalCount,
	});

	useEffect(() => {
		void dispatch(
			projectGroupsActions.loadUsers({
				page: userPage,
				pageSize: userPageSize,
			}),
		);
	}, [dispatch, userPage, userPageSize]);

	return (
		<ProjectGroupForm
			defaultValues={{
				...DEFAULT_PROJECT_GROUP_CREATE_PAYLOAD,
				projectId,
			}}
			onSubmit={onSubmit}
			submitLabel="Submit"
			users={usersWithCurrentProjectGroups}
			validationSchema={projectGroupCreateValidationSchema}
		/>
	);
};

export { ProjectGroupCreateForm };
