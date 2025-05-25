// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Oxygen-Sans",
          "Ubuntu",
          "Cantarell",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        base: "14px",
      },
      lineHeight: {
        snugger: "1.285",
      },
      height: {
        16: "50px",
      },
      backgroundColor: {
        "teal-900": "#03363d",
        "gray-100": "#f8f9f9",
      },
      borderColor: {
        "green-500": "#78a300",
      },
      width: {
        64: "16rem",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      cursor: ["focus"],
      width: ["focus"],
    },
  },
  plugins: [],
};
