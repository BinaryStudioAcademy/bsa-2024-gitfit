import { type FC } from "react";

interface IconProperties {
	className?: string;
	Icon: FC<React.SVGProps<SVGSVGElement>>;
}

const Icon: FC<IconProperties> = ({ className, Icon }: IconProperties) => {
	return <Icon className={className} />;
};

export { Icon };
