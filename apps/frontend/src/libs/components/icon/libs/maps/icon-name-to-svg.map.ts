import { type FC } from "react";

import Cross from "~/assets/images/icons/cross.svg?react";
import Eye from "~/assets/images/icons/eye.svg?react";
import StrikedEye from "~/assets/images/icons/striked-eye.svg?react";

import { type IconName } from "../../types/types.js";

const iconNameToSvg: Record<IconName, FC<React.SVGProps<SVGSVGElement>>> = {
	cross: Cross,
	eye: Eye,
	strikedEye: StrikedEye,
};

export { iconNameToSvg };
