module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({

      ...theme('colors'),

      'main': '#FF08B0',
     }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
