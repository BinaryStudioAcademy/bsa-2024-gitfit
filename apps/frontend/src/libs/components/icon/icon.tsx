import { iconNameToSvg } from "./libs/maps/maps.js";
import { type IconName } from "./types/types.js";

type Properties = {
	color?: string | undefined;
	height?: number;
	name: IconName;
	width?: number;
};

const Icon = ({ color, height, name, width }: Properties): JSX.Element => {
	const SvgComponent = iconNameToSvg[name];

	return <SvgComponent color={color} height={height} width={width} />;
};

export { Icon };
