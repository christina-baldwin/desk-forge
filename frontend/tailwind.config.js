/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#0e5d5a",
        accent: "#3ed2b3",
        background: "#e8f0f2",
        textDark: "#1b2a2f",
      },
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
