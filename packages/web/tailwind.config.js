module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], 
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        cursive: ['var(--cursive-font)', 'cursive']
      },
      fontSize: {
        '2xs': '.7rem',
        'md': '.9rem'
      },
      colors: {
        transparent: 'transparent',
        button: "var(--color-button-text)",
        primary: {
          50: "var(--color-primary-50)",
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
        },
      },
      dropShadow: {
        red: '0px 0px 0px 0px rgba(255, 0, 0, 0.5)',
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
    textColor: ({ after }) => after(["disabled"]),
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
