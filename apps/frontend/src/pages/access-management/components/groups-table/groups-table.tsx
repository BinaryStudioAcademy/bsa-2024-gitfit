import { Table } from "~/libs/components/components.js";
import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

import { getGroupColumns, getGroupRows } from "../../libs/helpers/helpers.js";
import { type GroupRow } from "../../libs/types/types.js";

type Properties = {
	groups: GroupGetAllItemResponseDto[];
};

const GroupsTable = ({ groups }: Properties): JSX.Element => {
	const groupColumns = getGroupColumns();
	const groupData: GroupRow[] = getGroupRows(groups);

	return (
		<>
			<Table<GroupRow> columns={groupColumns} data={groupData} />
		</>
	);
};

export { GroupsTable };
