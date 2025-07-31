/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Share Tech Mono", "monospace"],
        tech: ["Chakra Petch", "sans-serif"],
        logo: ["Bungee", "cursive"],
      },
    },
  },
  plugins: [],
};
