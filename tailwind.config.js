/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'grey_dark':'#CFCFCF',
      'grey_light':'#3D3A3A',
      'primary':'#2CCA90',
      'accent':'#025B42',
      'light_bg':'#EFEFEF',
      'dark_bg':'#000321',
      'dark_overlay':'#080B28',
      'light_overlay':'#f9f9f9',
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

