/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8ECF4',
          100: '#C5CFE4',
          200: '#9AAECF',
          300: '#6F8DBA',
          400: '#4D73A8',
          500: '#2B5997',
          600: '#244E87',
          700: '#1B3D6E',
          800: '#142E55',
          900: '#1B2A4A',
          950: '#0D1A2E',
        },
        brand: {
          green: '#2D6B2D',
          'green-dark': '#1E5A1E',
          'green-light': '#E8F5E8',
          navy: '#1B2A4A',
          'navy-dark': '#0D1A2E',
          white: '#FFFFFF',
          'grey-light': '#F5F7FA',
          'grey-mid': '#E2E8F0',
          'grey-text': '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
