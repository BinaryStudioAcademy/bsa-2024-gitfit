import { iconNameToSvg } from "./libs/maps/icon-name-to-svg.map.js";
import { type IconName } from "./types/icon-name.type.js";

type Properties = {
	name: IconName;
};

const Icon = ({ name }: Properties): JSX.Element => {
	const SvgComponent = iconNameToSvg[name];

	return <SvgComponent />;
};

export { Icon };
