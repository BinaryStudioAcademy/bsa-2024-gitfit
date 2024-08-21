import { type IconName } from "./icon-name.type.js";

type Icon = {
	className?: string | undefined;
	name: IconName;
	onClick?: () => void;
};

export { type Icon };
