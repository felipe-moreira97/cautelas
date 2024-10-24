/** @type {import('tailwindcss').Config} */
import { darkLayout, nextui } from "@nextui-org/react";
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {},
  darkMode:"class"
};
export const plugins = [nextui()];

