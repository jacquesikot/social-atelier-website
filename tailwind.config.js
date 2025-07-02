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
          50: '#fdf2f2',
          100: '#fbe5e5',
          200: '#f6cfd0',
          300: '#efaaac',
          400: '#e67c80',
          500: '#da5459',
          600: '#c63840',
          700: '#a52a33',
          800: '#8b252e',
          900: '#38040E',
          950: '#2a0309',
        },
        secondary: {
          50: '#fefcfa',
          100: '#fdf8f3',
          200: '#fbf1e6',
          300: '#F6EDE4',
          400: '#f0e2d1',
          500: '#e8d4bc',
          600: '#ddc2a2',
          700: '#cfab85',
          800: '#c19968',
          900: '#a67c56',
          950: '#8a5f3f',
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
