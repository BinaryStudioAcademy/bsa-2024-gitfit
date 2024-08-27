import { type FC } from "react";

import Access from "~/assets/images/icons/access.svg?react";
import Analytics from "~/assets/images/icons/analytics.svg?react";
import Contributors from "~/assets/images/icons/contributors.svg?react";
import Cross from "~/assets/images/icons/cross.svg?react";
import Eye from "~/assets/images/icons/eye.svg?react";
import LeftArrow from "~/assets/images/icons/left-arrow.svg?react";
import LeftDoubleArrow from "~/assets/images/icons/left-double-arrow.svg?react";
import Project from "~/assets/images/icons/project.svg?react";
import RightArrow from "~/assets/images/icons/right-arrow.svg?react";
import RightDoubleArrow from "~/assets/images/icons/right-double-arrow.svg?react";
import StrikedEye from "~/assets/images/icons/striked-eye.svg?react";

import { type IconName } from "../types/types.js";

const iconNameToSvg: Record<IconName, FC<React.SVGProps<SVGSVGElement>>> = {
	access: Access,
	analytics: Analytics,
	contributors: Contributors,
	cross: Cross,
	eye: Eye,
	leftArrow: LeftArrow,
	leftDoubleArrow: LeftDoubleArrow,
	project: Project,
	rightArrow: RightArrow,
	rightDoubleArrow: RightDoubleArrow,
	strikedEye: StrikedEye,
};

export { iconNameToSvg };
