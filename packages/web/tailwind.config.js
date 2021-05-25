module.exports = {
  purge: {
    content: ["./src/**/*.tsx", "./public/index.html"],
    options: {
      safelist: ['whitespace-pre-wrap'],
    },
  },
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        cursive: ['var(--cursive-font)', 'cursive']
      },
      fontSize: {
        '2xs': '0.7rem',
        'vs': '0.8125rem',
        'md': '0.9rem'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        button: "var(--color-button-text)",
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          450: "var(--color-primary-450)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
        secondary: {
          transparent: "var(--color-secondary-transparent)",
          50: "var(--color-secondary-50)",
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
          600: "var(--color-secondary-600)",
          700: "var(--color-secondary-700)",
          800: "var(--color-secondary-800)",
          900: "var(--color-secondary-900)",
        },
        accent: {
          transparent: "var(--color-accent-transparent)",
          'washed-out': "var(--color-accent-washed-out)",
          hover: "var(--color-accent-hover)",
          DEFAULT: "var(--color-accent)",
        },
      },
      screens: {
        '2cols': '912px',
        '1cols': '800px',
        'fullscreen': '612px',
      },
      borderRadius: {
        '35': '35%'
      }
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(['disabled']),
    textColor: ({ after }) => after(["disabled"]),
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled', 'group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
