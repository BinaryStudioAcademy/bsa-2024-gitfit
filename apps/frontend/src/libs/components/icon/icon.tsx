import { iconNameToSvg } from "./libs/maps/icon-name-to-svg.map.js";
import { type IconName } from "./types/icon-name.type.js";

interface IconProperties {
	className?: string;
	name: IconName;
}

const Icon = ({ className, name }: IconProperties): JSX.Element => {
	const SvgComponent = iconNameToSvg[name];

	return <SvgComponent className={className} />;
};

export { Icon };
