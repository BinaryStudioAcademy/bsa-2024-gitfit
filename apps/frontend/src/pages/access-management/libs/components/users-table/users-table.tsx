import { Table } from "~/libs/components/components.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { getUserColumns, getUserRows } from "../../helpers/helpers.js";
import { type UserRow } from "../../types/types.js";

type Properties = {
	users: UserGetAllItemResponseDto[];
};

const UsersTable = ({ users }: Properties): JSX.Element => {
	const userColumns = getUserColumns();
	const userData: UserRow[] = getUserRows(users);

	return <Table<UserRow> columns={userColumns} data={userData} />;
};

export { UsersTable };
