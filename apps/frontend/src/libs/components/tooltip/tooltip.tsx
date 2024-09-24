import { Tooltip as ReactTooltip } from "react-tooltip";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	content: string;
	id: string;
};

const Tooltip = ({ children, content, id }: Properties): JSX.Element => {
	return (
		<>
			<ReactTooltip className={styles["tooltip"] as string} clickable id={id} />
			<span data-tooltip-content={content} data-tooltip-id={id}>
				{children}
			</span>
		</>
	);
};

export { Tooltip };
