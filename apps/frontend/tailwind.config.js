const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./components/**/*.vue", "./layouts/**/*.vue", "./pages/**/*.vue"],
  theme: {
    theme: {
      extend: {
        fontFamily: {
          sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
