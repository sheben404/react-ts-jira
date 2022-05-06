import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "service-worker": resolve(__dirname, "src/service-worker"),
      components: resolve(__dirname, "src/components"),
      AuthenticatedApp: resolve(__dirname, "src/AuthenticatedApp"),
      UnAuthenticatedApp: resolve(__dirname, "src/UnAuthenticatedApp"),
      utils: resolve(__dirname, "src/utils"),
      context: resolve(__dirname, "src/context"),
      pages: resolve(__dirname, "src/pages"),
      assets: resolve(__dirname, "src/assets"),
    },
  },
});
