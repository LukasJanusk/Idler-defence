/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        medieval: {
          // Backgrounds
          dark: '#0F0F0F',
          stone: '#1E2A38',
          stoneLight: '#D3D3D3',
          stoneCrimson: '#7A1F2E',

          // Neutrals
          parchment: '#D9CBB4',
          wood: '#3E2C23',

          // Metallics
          gold: '#C9A227',
          silver: '#C0C0C0',

          // Fantasy Accents
          blood: '#8B1E3F',
          arcane: '#6A4C93',
          emerald: '#3A7D44',

          green: {
            100: '#E6F2EA',
            200: '#CCE6D5',
            300: '#99CCAA',
            400: '#66B380',
            500: '#339955',
            600: '#2D804C',
            700: '#246639',
            800: '#1E4D2B',
            900: '#15331B',
          },
        },

        // Semantic mappings (with hover shades)
        primary: {
          DEFAULT: '#6A4C93',
          hover: '#8562B1', // lighter arcane
        },
        secondary: {
          DEFAULT: '#C9A227',
          hover: '#E6B93A', // brighter gold
        },
        danger: {
          DEFAULT: '#8B1E3F',
          hover: '#A8324F', // lighter crimson
        },
        success: {
          DEFAULT: '#3A7D44',
          hover: '#4FA85A', // lighter emerald
        },
        neutral: {
          DEFAULT: '#D9CBB4',
          hover: '#E6DAC8', // lighter parchment
        },
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0px)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0px)' },
        },
      },
      animation: {
        pop: 'pop 0.6s ease',
        slideLeft: 'slideLeft 0.1s ease',
        slideRight: 'slideRight 0.1s ease',
      },
    },
  },
  plugins: [],
};
