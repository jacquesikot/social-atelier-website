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
          50: '#f5e6ea',
          100: '#e7bfc9',
          200: '#d98aa1',
          300: '#c94b6a',
          400: '#a92b4a',
          500: '#7a1d32',
          600: '#5a1525',
          700: '#430f1b',
          800: '#38040E', // main primary
          900: '#230208',
          950: '#170105',
        },
        secondary: {
          50: '#fffdfa',
          100: '#fef9f3',
          200: '#fdf5ec',
          300: '#F6EDE4', // main secondary
          400: '#e6d8c9',
          500: '#d6c3ae',
          600: '#bfa98e',
          700: '#a68e6e',
          800: '#8c7350',
          900: '#6e5737',
          950: '#4a3a22',
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
