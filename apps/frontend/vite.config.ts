import reactPlugin from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { browserslistToTargets, Features } from "lightningcss";
import { fileURLToPath } from "node:url";
import { type ConfigEnv, defineConfig, loadEnv } from "vite";

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
	const {
		VITE_APP_API_ORIGIN_URL,
		VITE_APP_DEVELOPMENT_PORT,
		VITE_APP_PROXY_SERVER_URL,
	} = loadEnv(mode, process.cwd());

	return defineConfig({
		build: {
			cssMinify: "lightningcss",
			outDir: "build",
		},
		css: {
			lightningcss: {
				drafts: {
					customMedia: true,
				},
				include: Features.MediaQueries,
				targets: browserslistToTargets(
					browserslist(["last 2 version", "not dead"]),
				),
			},
			transformer: "lightningcss",
		},
		plugins: [reactPlugin()],
		resolve: {
			alias: [
				{
					find: "~",
					replacement: fileURLToPath(new URL("src", import.meta.url)),
				},
			],
		},
		server: {
			port: Number(VITE_APP_DEVELOPMENT_PORT),
			proxy: {
				[VITE_APP_API_ORIGIN_URL as string]: {
					changeOrigin: true,
					target: VITE_APP_PROXY_SERVER_URL,
				},
			},
		},
	});
};

export default config;
