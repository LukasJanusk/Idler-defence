/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        medieval: {
          // Backgrounds
          dark: '#0F0F0F', // near black
          stone: '#1E2A38', // deep desaturated blue-gray

          // Neutrals
          parchment: '#D9CBB4', // beige paper
          wood: '#3E2C23', // leather/wood

          // Metallics
          gold: '#C9A227', // aged gold
          silver: '#C0C0C0', // steel/silver

          // Fantasy Accents
          blood: '#8B1E3F', // crimson red
          arcane: '#6A4C93', // arcane purple
          emerald: '#3A7D44', // healing green
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
    },
  },
  plugins: [],
};
