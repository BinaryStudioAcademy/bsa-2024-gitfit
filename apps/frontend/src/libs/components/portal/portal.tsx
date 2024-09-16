import { createPortal } from "react-dom";

type Properties = {
	children: React.ReactNode;
	targetId: `#${string}`;
};

const Portal = ({ children, targetId }: Properties): JSX.Element => {
	const target = document.querySelector(targetId);

	return target ? createPortal(children, target) : <></>;
};

export { Portal };
