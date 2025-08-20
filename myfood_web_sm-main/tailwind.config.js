/** 
 * TailwindCSS configuration file with DaisyUI integration.
 * Rewritten for originality with added comments explaining features.
 */

import daisyuiPlugin from "daisyui"; // DaisyUI plugin for Tailwind
import defaultTheme from "tailwindcss/defaultTheme"; // Default Tailwind theme
import svgToDataUri from "mini-svg-data-uri"; // Convert SVG to data URI for backgrounds
import colors from "tailwindcss/colors"; // Tailwind color palette
import { default as flattenPalette } from "tailwindcss/lib/util/flattenColorPalette"; // Flatten nested color objects

// Main Tailwind configuration export
export default {
  // Specify all files Tailwind should scan for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // Theme customization
  theme: {
    extend: {
      // Extend default theme here if needed
    },
  },

  // Dark mode setting
  darkMode: "class", // Enable class-based dark mode

  // Tailwind plugins
  plugins: [
    daisyuiPlugin, // DaisyUI plugin integration
    addCssVariablesForColors, // Custom function to expose color variables to CSS
    // Custom utilities for pattern backgrounds
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          // Grid pattern background (32px grid)
          "bg-pattern-grid": (colorValue) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='${colorValue}'><path d='M0 .5H31.5V32'/></svg>`
            )}")`,
          }),

          // Smaller grid pattern (8px grid)
          "bg-pattern-grid-sm": (colorValue) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='8' height='8' fill='none' stroke='${colorValue}'><path d='M0 .5H31.5V32'/></svg>`
            )}")`,
          }),

          // Dot pattern background
          "bg-pattern-dot": (colorValue) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'><circle fill='${colorValue}' cx='10' cy='10' r='1.6257'/></svg>`
            )}")`,
          }),
        },
        { 
          values: flattenPalette(theme("backgroundColor")), // Use Tailwind background colors
          type: "color", // Utility type
        }
      );
    },
  ],
};

/**
 * Function to convert Tailwind color palette into CSS variables
 * @param {object} param0 - Tailwind addBase function and theme accessor
 */
function addCssVariablesForColors({ addBase, theme }) {
  // Flatten nested color palette into a simple key-value object
  const allColorsFlat = flattenPalette(theme("colors"));

  // Convert colors into CSS variables
  const cssVars = Object.fromEntries(
    Object.entries(allColorsFlat).map(([colorName, colorValue]) => [`--${colorName}`, colorValue])
  );

  // Add the CSS variables to :root so they are globally available
  addBase({
    ":root": cssVars,
  });
}
