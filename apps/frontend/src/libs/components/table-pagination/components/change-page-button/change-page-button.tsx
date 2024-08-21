import styles from "./styles.module.css";

type Properties = {
	disabled?: boolean;
	icon: string; // TODO: expect Icon component here
	onClick: () => void;
};

const ChangePageButton = ({
	disabled,
	icon,
	onClick,
}: Properties): JSX.Element => {
	return (
		<button className={styles["button"]} disabled={disabled} onClick={onClick}>
			{icon}
		</button>
	);
};

export { ChangePageButton };
