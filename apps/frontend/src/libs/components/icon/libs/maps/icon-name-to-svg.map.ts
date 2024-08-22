import { type FC } from "react";

import Access from "~/assets/images/icons/access.svg?react";
import Analytics from "~/assets/images/icons/analytics.svg?react";
import Contributors from "~/assets/images/icons/contributors.svg?react";
import Project from "~/assets/images/icons/project.svg?react";
import { type IconName } from "~/libs/components/icon/types/types.js";

const iconNameToSvg: Record<IconName, FC<React.SVGProps<SVGSVGElement>>> = {
	access: Access,
	analytics: Analytics,
	contributors: Contributors,
	project: Project,
};

export { iconNameToSvg };
