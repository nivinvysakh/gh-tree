import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  root: path.resolve(__dirname),
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "../src"),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: path.resolve(__dirname, "../dist-site"),
    emptyOutDir: true,
  },
});
