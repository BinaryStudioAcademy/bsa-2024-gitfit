import { type FC } from "react";

import Access from "~/assets/images/icons/access.svg?react";
import Analytics from "~/assets/images/icons/analytics.svg?react";
import Contributors from "~/assets/images/icons/contributors.svg?react";
import Cross from "~/assets/images/icons/cross.svg?react";
import Ellipsis from "~/assets/images/icons/ellipsis.svg?react";
import Eye from "~/assets/images/icons/eye.svg?react";
import LeftArrow from "~/assets/images/icons/left-arrow.svg?react";
import LeftDoubleArrow from "~/assets/images/icons/left-double-arrow.svg?react";
import Pen from "~/assets/images/icons/pen.svg?react";
import Project from "~/assets/images/icons/project.svg?react";
import RightArrow from "~/assets/images/icons/right-arrow.svg?react";
import RightDoubleArrow from "~/assets/images/icons/right-double-arrow.svg?react";
import Search from "~/assets/images/icons/search.svg?react";
import StrikedEye from "~/assets/images/icons/striked-eye.svg?react";
import Trash from "~/assets/images/icons/trash.svg?react";

import { type IconName } from "../types/types.js";

const iconNameToSvg: Record<IconName, FC<React.SVGProps<SVGSVGElement>>> = {
	access: Access,
	analytics: Analytics,
	contributors: Contributors,
	cross: Cross,
	ellipsis: Ellipsis,
	eye: Eye,
	leftArrow: LeftArrow,
	leftDoubleArrow: LeftDoubleArrow,
	pen: Pen,
	project: Project,
	rightArrow: RightArrow,
	rightDoubleArrow: RightDoubleArrow,
	search: Search,
	strikedEye: StrikedEye,
	trash: Trash,
};

export { iconNameToSvg };
