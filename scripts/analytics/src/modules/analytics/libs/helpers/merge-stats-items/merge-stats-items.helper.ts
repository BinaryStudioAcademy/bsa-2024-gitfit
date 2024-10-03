import { type ActivityLogCreateItemRequestDto } from "../../types/types.js";
import { mergeArrayItems } from "../merge-array-items/merge-array-items.helper.js";

const mergeStatsItems = (
	items: ActivityLogCreateItemRequestDto["items"],
): ActivityLogCreateItemRequestDto["items"] =>
	mergeArrayItems(
		items,
		(item1, item2) =>
			item1.authorEmail === item2.authorEmail &&
			item1.authorName === item2.authorName,
		(mergedItem, item) => (mergedItem.commitsNumber += item.commitsNumber),
	);

export { mergeStatsItems };
