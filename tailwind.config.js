const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {},
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      padding: {
        DEFAULT: '1rem',
      },
    },
    fontFamily: {
      title: ['Oxygen', 'sans-serif'],
      content: ['Montserrat', 'sans-serif'],
    },
    fontSize: {
      xs: '0.64rem',
      sm: '0.8rem',
      base: '1.1rem',
      lg: '1.25rem',
      xl: '1.563rem',
      '2xl': '1.953rem',
      '3xl': '2.441rem',
      '4xl': '3.052rem',
    },
    spacing: {
      0: '0',
      0.5: '4px',
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '100px',
      11: '125px',
      12: '150px',
      13: '175px',
      14: '200px',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    borderRadius: {
      none: '0',
      sm: '4px',
      DEFAULT: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      full: '9999px',
      large: '12px',
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      50: 50,
      75: 75,
      100: 100,
      auto: 'auto',
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        dark: {
          primary: '#57AA6F',
          'primary-focus': '#4b9460',
          'primary-content': '#fffffe',
          secondary: '#72757e',
          'secondary-focus': '#62646c',
          'secondary-content': '#fffffe',
          accent: '#2cb67d',
          'accent-focus': '#259b6a',
          'accent-content': '#fffffe',
          neutral: '#010101',
          'neutral-focus': '#000000',
          'neutral-content': '#fffffe',
          'base-100': '#152331',
          // 'base-100': '#16161a',
          // 'base-200': '#242629',
          'base-200': '#1C2B3A',
          // 'base-300': '#d1d5db',
          'base-content': '#94a1b2',
          info: '#2cb67d',
          success: '#7f5af0',
          warning: '#ff8906',
          error: '#e53170',
        },
      },
      'light',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
