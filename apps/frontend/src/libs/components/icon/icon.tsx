/// <reference types="vite-plugin-svgr/client" />

import { type FC } from "react";

import Eye from "~/assets/images/icons/eye.svg?react";
import StrikedEye from "~/assets/images/icons/striked-eye.svg?react";

import { mapIconNameToSvg } from "./helpers/helpers.js";
import { type IconName, type Icon as Properties } from "./types/types.js";

const iconNameToSvg = mapIconNameToSvg<IconName>({
	eye: Eye,
	strikedEye: StrikedEye,
});

const Icon: FC<Properties> = ({ className, name, onClick }) => {
	const IconComponent = iconNameToSvg[name];

	return <IconComponent className={className} onClick={onClick} />;
};

export { Icon };
