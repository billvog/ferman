module.exports = {
  purge: {
    content: ["./src/**/*.tsx", "./public/index.html"],
    options: {
      safelist: ["h-8", "h-11"],
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
        button: "var(--color-button-text)",
        primary: {
          50: "rgb(var(--color-primary-50), var(--tw-bg-opacity, 1))",
          100: "rgb(var(--color-primary-100), var(--tw-bg-opacity, 1))",
          200: "rgb(var(--color-primary-200), var(--tw-bg-opacity, 1))",
          300: "rgb(var(--color-primary-300), var(--tw-bg-opacity, 1))",
          600: "rgb(var(--color-primary-600), var(--tw-bg-opacity, 1))",
          700: "rgb(var(--color-primary-700), var(--tw-bg-opacity, 1))",
          800: "rgb(var(--color-primary-800), var(--tw-bg-opacity, 1))",
          900: "rgb(var(--color-primary-900), var(--tw-bg-opacity, 1))",
        },
        secondary: {
          'washed-out': "rgb(var(--color-secondary-washed-out), var(--tw-bg-opacity, 1))",
          hover: "rgb(var(--color-secondary-hover), var(--tw-bg-opacity, 1))",
          DEFAULT: "rgb(var(--color-secondary), var(--tw-bg-opacity, 1))",
        },
        accent: {
          'washed-out': "rgb(var(--color-accent-washed-out), var(--tw-bg-opacity, 1))",
          hover: "rgb(var(--color-accent-hover), var(--tw-bg-opacity, 1))",
          DEFAULT: "rgb(var(--color-accent), var(--tw-bg-opacity, 1))",
        },
        gray: {
          '450': 'hsl(218, 11%, 58%)'
        }
      },
      dropShadow: {
        red: '0px 0px 0px 0px rgba(255, 0, 0, 0.5)',
      },
      screens: {
        'xs': '500px',
        'mobile': '400px'
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
      cursor: ['disabled']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
