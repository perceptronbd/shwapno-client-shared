import type { Config } from "tailwindcss";

export const tailwindConfig: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
      },
    },
  },
  plugins: [],
};
