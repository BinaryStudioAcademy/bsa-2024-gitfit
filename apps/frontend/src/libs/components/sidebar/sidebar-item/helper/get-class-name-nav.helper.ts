import styles from "../styles.module.css";

const getClassName = ({ isActive }: { isActive: boolean }): string => {
	return `${styles["navigation-link"] ?? ""} ${isActive ? (styles["active"] ?? "") : ""}`;
};

export { getClassName };
