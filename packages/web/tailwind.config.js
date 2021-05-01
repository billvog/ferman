module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], 
  darkMode: false,
  theme: {
    extend: {
      fontSize: {
        'md': '.9rem'
      },
      colors: {
        transparent: 'transparent',
        button: "var(--color-button-text)",
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          DEFAULT: "var(--color-primary-600)",
        },
        secondary: {
          'washed-out': "var(--color-secondary-washed-out)",
          hover: "var(--color-secondary-hover)",
          DEFAULT: "var(--color-secondary)",
        },
        accent: {
          'washed-out': "var(--color-accent-washed-out)",
          hover: "var(--color-accent-hover)",
          DEFAULT: "var(--color-accent)",
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
