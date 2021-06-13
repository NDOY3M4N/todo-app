module.exports = {
  purge: ['./index.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Josefin Sans'],
    },
    gradientColorStops: {
      primary: 'var(--clr-checkbox-grad1)',
      secondary: 'var(--clr-checkbox-grad2)',
    },
    extend: {
      borderColor: {
        muted: 'var(--clr-muted-200)',
      },
      letterSpacing: {
        widest: '.5em',
        },
      colors: {
        secondary: 'var(--clr-fill-secondary)',
      },
      textColor: {
        accent: 'hsl(220, 98%, 61%)',
        skin: {
          base: 'var(--clr-text-base)',
          muted: {
            100: 'var(--clr-muted-100)',
            200: 'var(--clr-muted-200)',
          },
          hover: 'var(--clr-muted-hover)',
        },
      },
      backgroundColor: {
        skin: {
          primary: 'var(--clr-fill-primary)',
          secondary: 'var(--clr-fill-secondary)',
        },
      },
      divideColor: {
        skin: {
          base: 'var(--clr-muted-200)',
        },
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover']
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
