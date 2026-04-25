/** @type {import('tailwindcss').Config} */
/**
 * Tailwind v4 NOTE:
 * In v4, almost everything moves to @theme {} in your CSS file.
 * This file is only kept for the `content` paths.
 * Colors, spacing, fonts, borderRadius — all defined in index.css @theme.
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}