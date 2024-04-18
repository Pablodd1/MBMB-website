/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sansita: ['var(--font-sansita)'],
      },
      fontSize: {
        md: {
          fontSize: '16px',
          lineHeight: '24px'
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        myababeel:'#009797',
        myababeel2:'#006c6c',
        myblack:"#231f20",
        mygreen:"#026711",
        myblue:"#A1B1FD",
        mypink:"#ED9CCC",
        pink2:"#9D0D64",
        primary:"#2f3d95"
      }
    },
  },
  plugins: [],
};
