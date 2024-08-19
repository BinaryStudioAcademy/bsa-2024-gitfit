import { ToastContainer as LibraryToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./styles.module.css";

const ToastContainer: React.FC = () => {
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
			position="top-center"
			rtl={false}
			theme="dark"
		/>
	);
};

export { ToastContainer };
