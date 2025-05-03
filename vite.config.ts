import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5182,
      strictPort: true,
      allowedHosts: true,
      proxy: {
        "/api": {
          target: env.VITE_PRIVATE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
        },
      },
    },
    preview: {
      port: 8080,
      host: "0.0.0.0",
      strictPort: true,
      allowedHosts: true,
    },
  };
});
