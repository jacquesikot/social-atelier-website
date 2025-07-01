/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        primary: ['Inter', 'sans-serif'],
        secondary: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        primary: {
          50: '#f5f3f2',
          100: '#e6e2df',
          200: '#d8d0ca',
          300: '#c0b3a9',
          400: '#a89585',
          500: '#967c6a',
          600: '#7d6353',
          700: '#6a5346',
          800: '#5a473c',
          900: '#4c3d34',
          950: '#2b211d',
        },
        secondary: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#4d4d4d',
          700: '#434343',
          800: '#383838',
          900: '#313131',
          950: '#1a1a1a',
        },
        accent: {
          50: '#fdf8ef',
          100: '#f9ebce',
          200: '#f3d69c',
          300: '#ecba65',
          400: '#e59e35',
          500: '#db8222',
          600: '#c1611c',
          700: '#a04419',
          800: '#83371a',
          900: '#6d2f19',
          950: '#3f170b',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};