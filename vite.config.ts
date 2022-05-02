import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@terra-money/terra.js": "@terra-money/terra.js/dist/bundle.js",
      process: path.resolve(__dirname, "src/polyfills/process-es6.js"),
      "readable-stream": "vite-compatible-readable-stream",
    },
  },
  plugins: [svelte()],
});
