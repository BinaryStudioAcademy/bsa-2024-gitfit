import { type ColumnDef } from "@tanstack/react-table";

import { formatDate } from "~/libs/helpers/helpers.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

const getUserColumns = (): ColumnDef<UserAuthResponseDto>[] => {
	return [
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorFn: (user: UserAuthResponseDto): string =>
				formatDate(new Date(user.createdAt), "d MMM yyyy HH:mm"),
			header: "Created At",
		},
	];
};

export { getUserColumns };
