import {
	createBrowserRouter,
	RouterProvider as LibraryRouterProvider,
	type RouteObject,
} from "react-router-dom";

type Properties = {
	routes: RouteObject[];
};

const RouterProvider: React.FC<Properties> = ({ routes }: Properties) => (
	<LibraryRouterProvider router={createBrowserRouter(routes)} />
);

export { RouterProvider };
