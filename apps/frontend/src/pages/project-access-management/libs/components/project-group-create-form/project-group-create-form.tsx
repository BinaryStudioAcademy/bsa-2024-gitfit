import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	usePagination,
} from "~/libs/hooks/hooks.js";
import {
	type ProjectGroupCreateRequestDto,
	projectGroupCreateValidationSchema,
	actions as projectGroupsActions,
} from "~/modules/project-groups/project-groups.js";

import { ProjectGroupForm } from "../project-group-form/project-group-form.js";
import { DEFAULT_PROJECT_GROUP_CREATE_PAYLOAD } from "./libs/constants/constants.js";

type Properties = {
	onSubmit: (payload: ProjectGroupCreateRequestDto) => void;
	projectId: number;
};

const ProjectGroupCreateForm = ({
	onSubmit,
	projectId,
}: Properties): JSX.Element => {
	const dispatch = useAppDispatch();

	const { usersTotalCount } = useAppSelector(
		({ projectGroups }) => projectGroups,
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
			submitLabel="Create"
			validationSchema={projectGroupCreateValidationSchema}
		/>
	);
};

export { ProjectGroupCreateForm };
