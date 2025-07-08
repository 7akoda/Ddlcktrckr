import { StyleSheet } from "react-native-unistyles"

type AppThemes = typeof appThemes
type AppBreakpoints = typeof breakpoints

declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppThemes {}
    export interface UnistylesBreakpoints extends AppBreakpoints {}
}

const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    superLarge: 2000,
    tvLike: 4000,
}


const lightTheme = {
  colors: {
      primary: '#dadcd6',
      secondary: '#b9bbb4',
      font: '#13100e',
      link: '#754043',
      

      // any nesting, spreading, arrays, etc.
  },
  // functions, external imports, etc.
  gap: (v: number) => v * 8
}

const darkTheme = {
  colors: {
      primary: '#596157',
      font: '#C2C5BB',
      secondary: '#42483F',
      link: '#94b0da',
  },
  gap: (v: number) => v * 8
}

export const appThemes = {
  light: lightTheme,
  dark: darkTheme
}

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings: {
    initialTheme: 'light',
},})