/// <reference types="vite-plugin-svgr/client" />

import { type FC } from "react";

import Eye from "~/assets/images/icons/eye.svg?react";
import StrikedEye from "~/assets/images/icons/striked-eye.svg?react";

type IconName = "eye" | "strikedEye";

const iconNameToSvg: Record<IconName, FC<React.SVGProps<SVGSVGElement>>> = {
	eye: Eye,
	strikedEye: StrikedEye,
};

interface Properties {
	className?: string | undefined;
	name: IconName;
	onClick?: () => void;
}

const Icon: FC<Properties> = ({ className, name, onClick }: Properties) => {
	const IconComponent = iconNameToSvg[name];

	return <IconComponent className={className} onClick={onClick} />;
};

export { Icon };
