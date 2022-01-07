// tailwind.config.js
module.exports = {
  future: {},
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  colors: {
    primary: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        default: '#ccc',
        100: '#7e5bef',
      },
    },
    pink: '#ff49db',
    orange: '#ff7849',
    green: '#13ce66',
    yellow: '#ffc82c',
    'gray-dark': '#273444',
    gray: '#8492a6',
    'gray-light': '#d3dce6',
  },
  fontFamily: {
    sans: ['Graphik', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
  variants: {},
  plugins: [],
};
