import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  root: "",
  base: "/",
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        demo: "./scroll.html",
      },
    },
  },
  server: {
    host: true, // to test on other devices with IP address
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
