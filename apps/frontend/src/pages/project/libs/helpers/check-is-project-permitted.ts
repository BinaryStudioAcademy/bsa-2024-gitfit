import { type ProjectPermissionsGetAllItemResponseDto } from "~/modules/project-permissions/project-permissions.js";

type Properties = {
	permissions: string[];
	projectId: string | undefined;
	projectUserPermissions: Record<
		number,
		ProjectPermissionsGetAllItemResponseDto[]
	>;
};

const checkIsProjectPermitted = ({
	permissions,
	projectId,
	projectUserPermissions,
}: Properties): boolean => {
	if (!projectId || !projectUserPermissions[Number(projectId)]) {
		return false;
	}

	return (
		projectUserPermissions[Number(projectId)]?.some((projectPermission) =>
			permissions.includes(projectPermission.key),
		) ?? false
	);
};

export { checkIsProjectPermitted };
