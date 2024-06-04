/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#EEEEE',
        'custom-gray':'#686D76',
        'custom-black':'#373A40',
        'custom-orange':'#DC5F00',
        'custom-dark':'#2D3250',
        'custom-nav':'#B4B4B3',
        'custom-h1':'#004225',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar'),
  ],
}