import { type ProjectPermissionsGetAllItemResponseDto } from "~/modules/project-permissions/project-permissions.js";

type Properties = {
	permission: string;
	projectId: string | undefined;
	projectUserPermissions: Record<
		number,
		ProjectPermissionsGetAllItemResponseDto[]
	>;
};

const checkIsProjectPermitted = ({
	permission,
	projectId,
	projectUserPermissions,
}: Properties): boolean => {
	if (!projectId || !projectUserPermissions[Number(projectId)]) {
		return false;
	}

	return (
		projectUserPermissions[Number(projectId)]?.some(
			(projectPermission) => projectPermission.key === permission,
		) ?? false
	);
};

export { checkIsProjectPermitted };
