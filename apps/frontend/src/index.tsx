import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";
import {
	App,
	ProtectedRoute,
	RouterProvider,
	StoreProvider,
	ToastContainer,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { AccessManagement } from "~/pages/access-management/access-management.jsx";
import { Auth } from "~/pages/auth/auth.jsx";
import { NotFound } from "~/pages/not-found/not-found.jsx";
import { Projects } from "~/pages/projects/projects.jsx";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<StoreProvider store={store.instance}>
			<RouterProvider
				routes={[
					{
						children: [
							{
								element: (
									<ProtectedRoute>
										<Projects />
									</ProtectedRoute>
								),
								path: AppRoute.ROOT,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_IN,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_UP,
							},
						],
						element: <App />,
						path: AppRoute.ROOT,
					},
					{
						element: <NotFound />,
						path: AppRoute.ANY,
					},
					{
						element: (
							<ProtectedRoute>
								<AccessManagement />
							</ProtectedRoute>
						),
						path: AppRoute.ACCESS_MANAGEMENT,
					},
				]}
			/>

			<ToastContainer />
		</StoreProvider>
	</StrictMode>,
);
