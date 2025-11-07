import { vitePlugin as reactRouter } from "@react-router/dev";
import { vercelPreset } from "@vercel/react-router/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter({
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
});
