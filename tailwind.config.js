/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js" 
],
theme: {
  extend: {
    colors : {
      primaryColor : "#0067FF",
      yellowColor : "#FEB60D",
      purpleColor : "#9771FF",
      irisBlueColor : "#01B5C5",
      textColor : "#4E545F",
      headingColor: "#181A1E"
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    boxShadow:{
      panelShadow : "rgba(17,12,46,0.15) 0px 48px 100px 0px;"
    }
  },
},
  plugins: [],
}

