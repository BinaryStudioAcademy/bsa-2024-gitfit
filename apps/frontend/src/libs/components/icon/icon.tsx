import { iconNameToSvg } from "./libs/maps/maps.js";
import { type IconName } from "./types/types.js";

type Properties = {
	height?: string;
	name: IconName;
	width?: string;
};

const Icon = ({
	height = "22px",
	name,
	width = "22px",
}: Properties): JSX.Element => {
	const SvgComponent = iconNameToSvg[name];

	return <SvgComponent height={height} width={width} />;
};

export { Icon };
