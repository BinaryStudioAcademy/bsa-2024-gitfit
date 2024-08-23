import { type FC } from "react";

import Eye from "~/assets/images/icons/eye.svg?react";
import LeftArrow from "~/assets/images/icons/left-arrow.svg?react";
import LeftDoubleArrow from "~/assets/images/icons/left-double-arrow.svg?react";
import RightArrow from "~/assets/images/icons/right-arrow.svg?react";
import RightDoubleArrow from "~/assets/images/icons/right-double-arrow.svg?react";
import StrikedEye from "~/assets/images/icons/striked-eye.svg?react";

import { type IconName } from "../../types/types.js";

const iconNameToSvg: Record<IconName, FC<React.SVGProps<SVGSVGElement>>> = {
	eye: Eye,
	leftArrow: LeftArrow,
	leftDoubleArrow: LeftDoubleArrow,
	rightArrow: RightArrow,
	rightDoubleArrow: RightDoubleArrow,
	strikedEye: StrikedEye,
};

export { iconNameToSvg };
