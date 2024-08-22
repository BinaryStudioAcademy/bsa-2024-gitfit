import { iconNameToSvg } from "./libs/maps/maps.js";
import { type IconName } from "./types/types.js";

type Properties = {
	height?: number;
	name: IconName;
	width?: number;
};

const Icon = ({ height, name, width }: Properties): JSX.Element => {
	const SvgComponent = iconNameToSvg[name];

	return <SvgComponent height={height} width={width} />;
};

export { Icon };
