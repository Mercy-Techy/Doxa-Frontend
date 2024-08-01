/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#1C12D0",
        textgray: "#667085",
        textlime: "#BBE809",
        authblue: "#1E13FE",
        bggray: "#EFF3F9",
      },
      fontFamily: {
        koho: ["KoHo", "sans-serif"],
        karla: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
