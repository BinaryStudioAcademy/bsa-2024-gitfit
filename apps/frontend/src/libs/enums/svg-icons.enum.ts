/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/// <reference types="vite-plugin-svgr/client" />

import accessIcon from "../../assets/images/icons/access.svg?react";
import analyticsIcon from "../../assets/images/icons/analytics.svg?react";
import contributorsIcon from "../../assets/images/icons/contributors.svg?react";
import projectIcon from "../../assets/images/icons/project.svg?react";

const Icons = {
	Access: accessIcon,
	Analytics: analyticsIcon,
	Contributors: contributorsIcon,
	Project: projectIcon,
} as const;

export { Icons };
