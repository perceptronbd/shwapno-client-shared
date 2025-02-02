import type { Config } from "tailwindcss";

import { customFontSizes } from "./src/utils/customFontSize";

const tailwindConfig: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: customFontSizes,
      colors: {
        primary: {
          100: "#E7E7EB",
          200: "#CFCFD6",
          300: "#B7B7C2",
          400: "#0B0B0D",
          500: "#5C5C6D",
        },
        secondary: {
          100: "#F6E2E2",
          200: "#F4B1B1",
          300: "#DB5D5D",
          400: "#DF0000",
          500: "#C20505",
        },
        success: {
          100: "#DFFFE3",
          200: "#A2FEB3",
          300: "#5CE07F",
          400: "#19CE1F",
          500: "#06BA1B",
        },
        warning: {
          100: "#FFF2DF",
          200: "#FEDBA2",
          300: "#FFC067",
          400: "#FDA80A",
          500: "#E08709",
        },
        error: {
          100: "#FFDFDF",
          200: "#FEA2A2",
          300: "#FF6767",
          400: "#FD0A0A",
          500: "#E00909",
        },
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
