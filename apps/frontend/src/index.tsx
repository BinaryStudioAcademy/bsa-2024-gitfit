import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

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
import { Profile } from "~/pages/profile/profile.jsx";
import { Project } from "~/pages/project/project.jsx";
import { Projects } from "~/pages/projects/projects.jsx";
import { Ui } from "~/pages/ui/ui.jsx";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<StoreProvider store={store.instance}>
			<RouterProvider
				routes={[
					/* TO DO: Remove page as soon as there is no unused exports */
					{ element: <Ui />, path: AppRoute.UI },
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
								element: (
									<ProtectedRoute>
										<AccessManagement />
									</ProtectedRoute>
								),
								path: AppRoute.ACCESS_MANAGEMENT,
							},
							{
								element: (
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								),
								path: AppRoute.PROFILE,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_IN,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_UP,
							},
							{
								element: <Project />,
								path: AppRoute.PROJECT,
							},
						],
						element: <App />,
						path: AppRoute.ROOT,
					},
					{
						element: <NotFound />,
						path: AppRoute.ANY,
					},
				]}
			/>
			<ToastContainer />
		</StoreProvider>
	</StrictMode>,
);
