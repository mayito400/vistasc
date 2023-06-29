/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/views/**/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  daisyui:{
    theme:["hallowen"]
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  }
}

