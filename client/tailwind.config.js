/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        primary:'#1E3A8A',
        accent:'#EC4899',
        secondaty:'#7C3AED',
        font:'#F9FAFB'
      },
      fontFamily:{
        rubik:'"Rubik", sans-serif',
        audio:'"Audiowide", sans-serif',
        cute:'"Cute Font", sans-serif',
        geo:'"Geo", sans-serif',
        cool:'"ZCOOL QingKe HuangYou", sans-serif'
      },
      backgroundImage: {
        'icon': "url('https://images.unsplash.com/photo-1718453908989-9908c12ba77d?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'dashboard': "url('https://i.ibb.co/w6V0xjB/mashiur-rahman-R0p8et-Tpdp-E-unsplash.jpg')",
        'newsletter': "url('https://i.ibb.co/bL2xbYT/pexels-leo-willians-789496294-19365740.jpg')",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
