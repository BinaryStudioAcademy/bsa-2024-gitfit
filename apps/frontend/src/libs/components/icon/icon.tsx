import { colorToCss } from "~/libs/maps/maps.js";
import { type Color } from "~/libs/types/types.js";

import { iconNameToSvg } from "./libs/maps/maps.js";
import { type IconName } from "./types/types.js";

type Properties = {
	color?: Color;
	height: number;
	name: IconName;
	width: number;
};

const Icon = ({
	color = "textSecondary",
	height,
	name,
	width,
}: Properties): JSX.Element => {
	const SvgComponent = iconNameToSvg[name];
	const cssColor = colorToCss[color];

	return <SvgComponent color={cssColor} height={height} width={width} />;
};

export { Icon };
