import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
	App,
	Navigate,
	ProtectedRoute,
	RouterProvider,
	StoreProvider,
	ToastContainer,
} from "~/libs/components/components.js";
import { AppRoute, PermissionKey } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { AccessManagement } from "~/pages/access-management/access-management.jsx";
import { Analytics } from "~/pages/analytics/analytics.jsx";
import { Auth } from "~/pages/auth/auth.jsx";
import { NoAccess } from "~/pages/no-access/no-access.jsx";
import { NotFound } from "~/pages/not-found/not-found.jsx";
import { Profile } from "~/pages/profile/profile.jsx";
import { Project } from "~/pages/project/project.jsx";
import { Projects } from "~/pages/projects/projects.jsx";

import { ProjectAccessManagement } from "./pages/project-access-management/project-access-management.js";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<StoreProvider store={store.instance}>
			<RouterProvider
				routes={[
					{
						children: [
							{
								element: (
									<ProtectedRoute
										routePermissions={[PermissionKey.VIEW_ALL_PROJECTS]}
									>
										<Projects />
									</ProtectedRoute>
								),
								path: AppRoute.PROJECTS,
							},
							{
								element: (
									<ProtectedRoute
										routePermissions={[PermissionKey.MANAGE_USER_ACCESS]}
									>
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
								element: (
									<ProtectedRoute>
										<Analytics />
									</ProtectedRoute>
								),
								path: AppRoute.ANALYTICS,
							},
							{
								element: (
									<ProtectedRoute>
										<NoAccess />
									</ProtectedRoute>
								),
								path: AppRoute.NO_ACCESS,
							},
							{
								element: <Navigate to={AppRoute.PROJECTS} />,
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
							{
								element: (
									<ProtectedRoute
										routePermissions={[PermissionKey.VIEW_ALL_PROJECTS]}
									>
										<Project />
									</ProtectedRoute>
								),
								path: AppRoute.PROJECT,
							},
							{
								element: <ProjectAccessManagement />,
								path: AppRoute.PROJECT_ACCESS_MANAGEMENT,
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
