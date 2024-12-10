const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        blue: "#0A1C3E",
        transparent: "transparent",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
