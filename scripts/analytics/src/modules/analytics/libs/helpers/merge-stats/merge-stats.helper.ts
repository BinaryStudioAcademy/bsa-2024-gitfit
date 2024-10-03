import { type ActivityLogCreateItemRequestDto } from "../../types/types.js";
import { mergeArrayItems } from "../merge-array-items/merge-array-items.helper.js";
import { mergeStatsItems } from "../merge-stats-items/merge-stats-items.helper.js";

const mergeStats = (
	statsAll: ActivityLogCreateItemRequestDto[],
): ActivityLogCreateItemRequestDto[] =>
	mergeArrayItems(
		statsAll,
		(item1, item2) => item1.date === item2.date,
		(mergedItem, item) =>
			(mergedItem.items = mergeStatsItems([
				...mergedItem.items,
				...item.items,
			])),
	);

export { mergeStats };
