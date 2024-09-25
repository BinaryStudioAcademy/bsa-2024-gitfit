import { type FC } from "react";

import Access from "~/assets/images/icons/access.svg?react";
import Analytics from "~/assets/images/icons/analytics.svg?react";
import Calendar from "~/assets/images/icons/calendar.svg?react";
import Check from "~/assets/images/icons/check.svg?react";
import Clipboard from "~/assets/images/icons/clipboard.svg?react";
import Contributors from "~/assets/images/icons/contributors.svg?react";
import Cross from "~/assets/images/icons/cross.svg?react";
import Ellipsis from "~/assets/images/icons/ellipsis.svg?react";
import Eye from "~/assets/images/icons/eye.svg?react";
import LeftArrow from "~/assets/images/icons/left-arrow.svg?react";
import LeftDoubleArrow from "~/assets/images/icons/left-double-arrow.svg?react";
import Merge from "~/assets/images/icons/merge.svg?react";
import Notifications from "~/assets/images/icons/notifications.svg?react";
import Pencil from "~/assets/images/icons/pencil.svg?react";
import Project from "~/assets/images/icons/project.svg?react";
import RightArrow from "~/assets/images/icons/right-arrow.svg?react";
import RightDoubleArrow from "~/assets/images/icons/right-double-arrow.svg?react";
import Search from "~/assets/images/icons/search.svg?react";
import Split from "~/assets/images/icons/split.svg?react";
import StrikedEye from "~/assets/images/icons/striked-eye.svg?react";
import Sync from "~/assets/images/icons/sync.svg?react";
import TrashBin from "~/assets/images/icons/trash-bin.svg?react";
import Warning from "~/assets/images/icons/warning.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<IconName, FC<React.SVGProps<SVGSVGElement>>> = {
	access: Access,
	analytics: Analytics,
	calendar: Calendar,
	check: Check,
	clipboard: Clipboard,
	contributors: Contributors,
	cross: Cross,
	ellipsis: Ellipsis,
	eye: Eye,
	leftArrow: LeftArrow,
	leftDoubleArrow: LeftDoubleArrow,
	merge: Merge,
	notifications: Notifications,
	pencil: Pencil,
	project: Project,
	rightArrow: RightArrow,
	rightDoubleArrow: RightDoubleArrow,
	search: Search,
	split: Split,
	strikedEye: StrikedEye,
	sync: Sync,
	trashBin: TrashBin,
	warning: Warning,
};

export { iconNameToSvg };
