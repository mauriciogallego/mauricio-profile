/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        neutro: '#0a192f',
        'neon-green': '#64ffda',
        'white-light': '#ccd6f6',
        'white-dark': '#a8b2d1',
      },
    },
  },
  plugins: [],
};
