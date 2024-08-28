/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1E201E",
        oliveGreen: "#3C3D37",
        sage: "#697565",
        sand: "#ECDFCC",
      },
    },
  },
  plugins: [],
};
