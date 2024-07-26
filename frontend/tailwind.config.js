/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      patrick: "Patrick Hand",
    },
    backgroundImage: {
      gradient: "linear-gradient(135deg, #25FDA2, #25FD78, #25FDD4, #FD25A5)",
    },
    keyframes: {
      progress: {
        "0%": { width: "0%" },
        "100%": { width: "100%" },
      },
    },
    animation: {
      progress: "progress 5000ms linear forwards",
    },
    extend: {},
  },
  plugins: [],
};
