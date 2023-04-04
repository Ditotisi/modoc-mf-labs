import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia,
        primary: {
          light: '#8AE9FF',
          DEFAULT: '#00c9ff'
        },
        secondary: {
          light: '#FFC880',
          DEFAULT: '#FF6E00'
        },
        success: '#00C300',
        danger: '#E70016',
        warning: '#FFDF66'
      },
      //   screens: {
      //     sm: '640px',
      //     md: '768px',
      //     lg: '1024px',
      //     xl: '1280px',
      //     '2xl': '1536px'
      //   },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      }
    //   extend: {
    //     spacing: {
    //       128: '32rem',
    //       144: '36rem'
    //     },
    //     borderRadius: {
    //       '4xl': '2rem'
    //     }
    //   }
    }
  },
  
})
