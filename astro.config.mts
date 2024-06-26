// @ts-ignore
import astroI18next from 'astro-i18next';
import tailwind from '@astrojs/tailwind';
import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), astroI18next()],
  image: {
    service: passthroughImageService(),
  },
});
