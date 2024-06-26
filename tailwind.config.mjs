/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        neutro: '#0a192f',
        'neutro-dark': '#233554',
        slate: '#8892b0',
        'navy-light': '#112240',
        'neon-green': '#64ffda',
        'white-light': '#ccd6f6',
        'white-dark': '#a8b2d1',
      },
      boxShadow: {
        large: '0px 0px 65px rgba(0, 0, 0, 0.22)', // dark shadow
        left: '-2px 0px 0.5px 0px rgba(0, 0, 0, 0.22)',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
};
