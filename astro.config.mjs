// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  site: 'https://vertix.market',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Space Grotesk",
        cssVariable: "--font-space-grotesk",
        weights: [400, 500, 600, 700, 800, 900],
        fallbacks: ["inter", "sans-serif", "system-ui"],
      },
    ],
  },
});