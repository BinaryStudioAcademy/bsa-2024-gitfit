// vite.config.ts
import reactPlugin from "file:///Users/vitalii/Desktop/Developer/bsa-2024-gitfit/node_modules/@vitejs/plugin-react/dist/index.mjs";
import browserslist from "file:///Users/vitalii/Desktop/Developer/bsa-2024-gitfit/node_modules/browserslist/index.js";
import { browserslistToTargets, Features } from "file:///Users/vitalii/Desktop/Developer/bsa-2024-gitfit/node_modules/lightningcss/node/index.mjs";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "file:///Users/vitalii/Desktop/Developer/bsa-2024-gitfit/node_modules/vite/dist/node/index.js";
import svgr from "file:///Users/vitalii/Desktop/Developer/bsa-2024-gitfit/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/vitalii/Desktop/Developer/bsa-2024-gitfit/apps/frontend/vite.config.ts";
var config = ({ mode }) => {
  const {
    VITE_APP_API_ORIGIN_URL,
    VITE_APP_DEVELOPMENT_PORT,
    VITE_APP_PROXY_SERVER_URL
  } = loadEnv(mode, process.cwd());
  return defineConfig({
    build: {
      cssMinify: "lightningcss",
      outDir: "build"
    },
    css: {
      lightningcss: {
        drafts: {
          customMedia: true
        },
        include: Features.MediaQueries,
        targets: browserslistToTargets(
          browserslist(["last 2 version", "not dead"])
        )
      },
      transformer: "lightningcss"
    },
    plugins: [
      reactPlugin(),
      svgr({
        include: "**/*.svg?react"
      })
    ],
    resolve: {
      alias: [
        {
          find: "~",
          replacement: fileURLToPath(new URL("src", __vite_injected_original_import_meta_url))
        }
      ]
    },
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT),
      proxy: {
        [VITE_APP_API_ORIGIN_URL]: {
          changeOrigin: true,
          target: VITE_APP_PROXY_SERVER_URL
        }
      }
    }
  });
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdml0YWxpaS9EZXNrdG9wL0RldmVsb3Blci9ic2EtMjAyNC1naXRmaXQvYXBwcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3ZpdGFsaWkvRGVza3RvcC9EZXZlbG9wZXIvYnNhLTIwMjQtZ2l0Zml0L2FwcHMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3ZpdGFsaWkvRGVza3RvcC9EZXZlbG9wZXIvYnNhLTIwMjQtZ2l0Zml0L2FwcHMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3RQbHVnaW4gZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgYnJvd3NlcnNsaXN0IGZyb20gXCJicm93c2Vyc2xpc3RcIjtcbmltcG9ydCB7IGJyb3dzZXJzbGlzdFRvVGFyZ2V0cywgRmVhdHVyZXMgfSBmcm9tIFwibGlnaHRuaW5nY3NzXCI7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyB0eXBlIENvbmZpZ0VudiwgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XG5cbmNvbnN0IGNvbmZpZyA9ICh7IG1vZGUgfTogQ29uZmlnRW52KTogUmV0dXJuVHlwZTx0eXBlb2YgZGVmaW5lQ29uZmlnPiA9PiB7XG5cdGNvbnN0IHtcblx0XHRWSVRFX0FQUF9BUElfT1JJR0lOX1VSTCxcblx0XHRWSVRFX0FQUF9ERVZFTE9QTUVOVF9QT1JULFxuXHRcdFZJVEVfQVBQX1BST1hZX1NFUlZFUl9VUkwsXG5cdH0gPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xuXG5cdHJldHVybiBkZWZpbmVDb25maWcoe1xuXHRcdGJ1aWxkOiB7XG5cdFx0XHRjc3NNaW5pZnk6IFwibGlnaHRuaW5nY3NzXCIsXG5cdFx0XHRvdXREaXI6IFwiYnVpbGRcIixcblx0XHR9LFxuXHRcdGNzczoge1xuXHRcdFx0bGlnaHRuaW5nY3NzOiB7XG5cdFx0XHRcdGRyYWZ0czoge1xuXHRcdFx0XHRcdGN1c3RvbU1lZGlhOiB0cnVlLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbmNsdWRlOiBGZWF0dXJlcy5NZWRpYVF1ZXJpZXMsXG5cdFx0XHRcdHRhcmdldHM6IGJyb3dzZXJzbGlzdFRvVGFyZ2V0cyhcblx0XHRcdFx0XHRicm93c2Vyc2xpc3QoW1wibGFzdCAyIHZlcnNpb25cIiwgXCJub3QgZGVhZFwiXSksXG5cdFx0XHRcdCksXG5cdFx0XHR9LFxuXHRcdFx0dHJhbnNmb3JtZXI6IFwibGlnaHRuaW5nY3NzXCIsXG5cdFx0fSxcblx0XHRwbHVnaW5zOiBbXG5cdFx0XHRyZWFjdFBsdWdpbigpLFxuXHRcdFx0c3Zncih7XG5cdFx0XHRcdGluY2x1ZGU6IFwiKiovKi5zdmc/cmVhY3RcIixcblx0XHRcdH0pLFxuXHRcdF0sXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0YWxpYXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZpbmQ6IFwiflwiLFxuXHRcdFx0XHRcdHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCJzcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdFx0c2VydmVyOiB7XG5cdFx0XHRwb3J0OiBOdW1iZXIoVklURV9BUFBfREVWRUxPUE1FTlRfUE9SVCksXG5cdFx0XHRwcm94eToge1xuXHRcdFx0XHRbVklURV9BUFBfQVBJX09SSUdJTl9VUkwgYXMgc3RyaW5nXToge1xuXHRcdFx0XHRcdGNoYW5nZU9yaWdpbjogdHJ1ZSxcblx0XHRcdFx0XHR0YXJnZXQ6IFZJVEVfQVBQX1BST1hZX1NFUlZFUl9VUkwsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VyxPQUFPLGlCQUFpQjtBQUNwWSxPQUFPLGtCQUFrQjtBQUN6QixTQUFTLHVCQUF1QixnQkFBZ0I7QUFDaEQsU0FBUyxxQkFBcUI7QUFDOUIsU0FBeUIsY0FBYyxlQUFlO0FBQ3RELE9BQU8sVUFBVTtBQUxtTixJQUFNLDJDQUEyQztBQU9yUixJQUFNLFNBQVMsQ0FBQyxFQUFFLEtBQUssTUFBa0Q7QUFDeEUsUUFBTTtBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0QsSUFBSSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFFL0IsU0FBTyxhQUFhO0FBQUEsSUFDbkIsT0FBTztBQUFBLE1BQ04sV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLElBQ1Q7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNKLGNBQWM7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNkO0FBQUEsUUFDQSxTQUFTLFNBQVM7QUFBQSxRQUNsQixTQUFTO0FBQUEsVUFDUixhQUFhLENBQUMsa0JBQWtCLFVBQVUsQ0FBQztBQUFBLFFBQzVDO0FBQUEsTUFDRDtBQUFBLE1BQ0EsYUFBYTtBQUFBLElBQ2Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLFlBQVk7QUFBQSxNQUNaLEtBQUs7QUFBQSxRQUNKLFNBQVM7QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUixPQUFPO0FBQUEsUUFDTjtBQUFBLFVBQ0MsTUFBTTtBQUFBLFVBQ04sYUFBYSxjQUFjLElBQUksSUFBSSxPQUFPLHdDQUFlLENBQUM7QUFBQSxRQUMzRDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDUCxNQUFNLE9BQU8seUJBQXlCO0FBQUEsTUFDdEMsT0FBTztBQUFBLFFBQ04sQ0FBQyx1QkFBaUMsR0FBRztBQUFBLFVBQ3BDLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxRQUNUO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNELENBQUM7QUFDRjtBQUVBLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
