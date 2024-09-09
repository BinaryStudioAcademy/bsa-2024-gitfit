import { ToastContainer as LibraryToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./styles.module.css";

const ToastContainer = (): JSX.Element => {
	return (
		<LibraryToastContainer
			autoClose={5000}
			className={styles["toast-container"] as string}
			closeOnClick
			draggable
			hideProgressBar={false}
			newestOnTop={false}
			pauseOnFocusLoss
			pauseOnHover
			position="top-right"
			rtl={false}
			theme="dark"
			toastClassName={styles["notification"] as string}
		/>
	);
};

export { ToastContainer };
