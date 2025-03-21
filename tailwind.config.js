/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "oxford-blue": "#001b2e",
        "oxford-blue-opacity": "rgba(0, 27, 46, 0.3)",
        "picton-blue": "#00a5e0ff",
        white: "#ffffffff",
        raspberry: "#ce2d4f",
        timberwolf: "#d7d5d7ff",
        "antiflash-white": "#E7ECEF",
      },
      gridAutoRows: {
        full: "minmax(0, 100%)",
      },
      gridAutoColumns: {
        300: "300px",
      },
      backgroundImage: {
        "line-gradient": "linear-gradient(to right, #ce2d4f 0%, #00a5e0 50%, #ce2d4f 100%)",
      },
    },
  },
  plugins: [],
};
