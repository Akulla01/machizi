/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'grey_dark':'#FFF',
      'grey_light':'#1D1B1B',
      'primary':'#05FFC0',
      'accent':'#118E6F',
      'light_bg':'#FFFFFF',
      'dark_bg':'#000000',
      'dark_overlay':'#0f0f0f',
      'light_overlay':'#E5E5E5',
      "overlays":"#080b2856",
      'transparent':'transparent',
      'silver':'#070808',
      'basic':'#a9b0b4',
      'overlay':"#b8b8b863",
      'platinum':'#A0B2c6',
      'gold':'orange',
      'crimson':'crimson'
    },
    fontFamily:{
      'roboto':'Roboto'
    }
  },
  plugins: [],
  darkMode:'class',
}

