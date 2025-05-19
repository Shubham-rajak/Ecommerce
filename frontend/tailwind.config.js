/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily:{

      // },
      colors:{
        primary:"#088178",
        tarnary:"#b6dbd8"

      },
      container:{
        center:true,
        padding:{
          DEFAULT:"0.5rem",
          sm:"1rem",
          lg:"2rem",
          xl:"3rem",
          "2xl":"4rem",
          "3xl":"8rem",
        },
        // screens: {
        //   'sm': '640px',    
        //   'md': '768px',    
        //   'lg': '1024px',    
        //   'xl': '1280px',    
        //   '2xl': '1536px',        }
      },
      // backgroundImage:{
      //   'banner-img':[
      //     'url(./src/assets/images/banner-1.jpeg)',
      // 'url(./src/assets/images/banner-1.jpeg)',
      //   ] 
      // },

     backgroundImage:{
        'banner1-img':'url(./src/assets/images/banner-4.png)',
        'banner2-img':[
          'url(./src/assets/images/banner-1.jpeg)',
          'url(./src/assets/images/banner-2.jpeg)',
          'url(./src/assets/images/banner-3.jpeg)',
        ],
      },
    },
  },
  plugins: [],
}
