import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

type GroupOptions = {
	onEdit: (group: GroupGetAllItemResponseDto) => void;
};

export { type GroupOptions };
