/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      "forest",
      {
        dark: {
          ...require('daisyui/src/colors/themes')["[data-theme=forest]"],
          "neutral": "#292524",
          "--rounded-btn": "0.5rem",
        }
      },
      {
        light: {
          ...require('daisyui/src/colors/themes')["[data-theme=garden]"]
        }
      }
    ],

  }
}
