/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#03014C",
        primary: "#11175D",
        secondary: "#5F35F5",
        orange: "#EA6C00",
        textDeem: "#3d3d3d59",
        textSecondary: "#4d4d4dbf",
        customGrey: "#F1F1F1",
        emojiGrey: "#707070",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      boxShadow: {
        custom: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
