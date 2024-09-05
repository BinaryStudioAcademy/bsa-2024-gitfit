import { type GroupGetAllItemResponseDto } from "~/modules/groups/groups.js";

type GroupOptions = {
	onDelete: (group: GroupGetAllItemResponseDto) => void;
};

export { type GroupOptions };
