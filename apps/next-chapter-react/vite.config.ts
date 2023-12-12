import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "tailwind.config.js": path.resolve(__dirname, "tailwind.config.js"),
    },
  },
  optimizeDeps: {
    include: [path.resolve(__dirname, "tailwind.config.js")],
  },
});
