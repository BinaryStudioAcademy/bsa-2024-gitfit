import { formatDate } from "~/libs/helpers/helpers.js";
import { type TableColumn } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

const getUserColumns = (): TableColumn<UserAuthResponseDto>[] => {
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
