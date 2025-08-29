// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // Used for generating absolute URLs (canonical, OG) and images
  site: "https://kinetobyzevedei.com",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
