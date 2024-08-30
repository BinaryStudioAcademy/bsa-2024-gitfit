import styles from "./styles.module.css";

type Properties = {
	altText?: string;
	isImageLoaded: boolean;
	logoSrc: string;
	onImageError: () => void;
};

const Logo = ({
	altText = "Logo",
	isImageLoaded,
	logoSrc,
	onImageError,
}: Properties): JSX.Element => {
	return (
		<>
			{isImageLoaded ? (
				<img
					alt={altText}
					className={styles["logo-wrapper"]}
					onError={onImageError}
					src={logoSrc}
				/>
			) : (
				<span className={styles["logo-text"]}>{altText}</span>
			)}
		</>
	);
};

export { Logo };
