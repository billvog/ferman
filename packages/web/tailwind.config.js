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
