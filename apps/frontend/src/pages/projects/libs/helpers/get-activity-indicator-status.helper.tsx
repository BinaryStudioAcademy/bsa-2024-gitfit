import { type ComponentProps } from "react";

import { type ActivityIndicator } from "../components/components.js";
import { ActivityIndicatorThreshold } from "../enums/enums.js";

const getActivityIndicatorStatus = (
	daysDifference: number,
): ComponentProps<typeof ActivityIndicator>["status"] => {
	if (daysDifference < ActivityIndicatorThreshold.GREEN) {
		return "green";
	}

	if (daysDifference < ActivityIndicatorThreshold.YELLOW) {
		return "yellow";
	}

	return "red";
};

export { getActivityIndicatorStatus };
