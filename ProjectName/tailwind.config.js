/** @type {import('tailwindcss').Config} */

const {unitSize, colors} = require('./src/constants');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
    },

    spacing: {
      ...unitSize,
    },
    fontSize: {
      ...unitSize,
    },
    // fontFamily: {
    //   suit: ['SUIT-Regular'],
    //   'suit-bold': ['SUIT-Bold'],
    //   'suit-xbold': ['SUIT-ExtraBold'],
    //   'suit-heavy': ['SUIT-Heavy'],
    //   'suit-light': ['SUIT-Light'],
    //   'suit-xlight': ['SUIT-ExtraLight'],
    //   'suit-medium': ['SUIT-Medium'],
    //   'suit-semibold': ['SUIT-Semibold'],
    //   'suit-thin': ['SUIT-Thin'],
    // },
    borderWidth: {
      ...unitSize,
    },
    borderRadius: {
      ...unitSize,
      full: 9999,
      none: 0,
    },
    minHeight: {
      ...unitSize,
    },
    maxHeight: {
      ...unitSize,
    },
    minWidth: {
      ...unitSize,
    },
    maxWidth: {
      ...unitSize,
    },
    translate: {
      ...unitSize,
    },
    leading: {
      ...unitSize,
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.leading-unset': {
          lineHeight: undefined,
        },
      });
    }),
  ],
  extend: {
    lineHeight: {
      ...unitSize,
    },
  },
};
