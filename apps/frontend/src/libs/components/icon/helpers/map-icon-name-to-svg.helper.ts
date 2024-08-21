import { type FC } from "react";

const mapIconNameToSvg = <T extends string>(
	icons: Record<T, FC<React.SVGProps<SVGSVGElement>>>,
): Record<T, FC<React.SVGProps<SVGSVGElement>>> => {
	return icons;
};

export { mapIconNameToSvg };
