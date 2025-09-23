module.export = {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}" ,
        "./public/index.html"
    ],
    theme: {
        extend: {
             colors: {
                 primary: "#140220",
                 secondary: "#01081f",
                 accent: "#cddfe4",
                 highlight: "#f5e7ab"
             },
             fontFamily: {
                 sans: ['"Open Sans"', 'sans-serif'],
                 serif: ['"Merriweather"', 'serif']
             },
            animation:{
                'bounce-slow': 'btnbounce 3000ms linear infinite',
            },
            keyframes:{
                btnbounce:{
                '0% , 100%' :{
                        transform: 'translateY(-25%)',
                        animatiionTimingFunction: 'cubic-bezier(0.8,0,1,1)'
                     },
                 
                '50%' :{
                        transform: 'none',
                        animatiionTimingFunction: 'cubic-bezier(0,0,0.2,1'
                     },
                },
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ]
}