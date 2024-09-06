import { ToastContainer as LibraryToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./styles.module.css";

const ToastContainer = (): JSX.Element => {
	return (
		<LibraryToastContainer
			autoClose={5000}
			className={styles["toast-container"] ?? ""}
			closeOnClick
			draggable
			hideProgressBar={false}
			newestOnTop={false}
			pauseOnFocusLoss
			pauseOnHover
			position="top-left"
			rtl={false}
			theme="dark"
		/>
	);
};

export { ToastContainer };
