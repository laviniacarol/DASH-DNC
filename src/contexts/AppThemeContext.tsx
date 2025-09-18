import { createContext, useState, useEffect, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '@/styles'
import { AppThemeContextProps } from '@/types'

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // add your theme properties here
    appBackground: string;
    appColor: string;
    appSkeletonFrom: string;
    appSkeletonTo: string;
  }
}
export const AppThemeContext = createContext<AppThemeContextProps | undefined>(undefined)

export const AppThemeProvider = ({ children } : { children: ReactNode }) => {
    const savedTheme = localStorage.getItem('theme')
    const [appTheme, setAppTheme ] = useState(savedTheme ?? 'light')

    const toggleTheme = () => {
        setAppTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))

    }
    useEffect(() => {
        localStorage.setItem('theme', appTheme)
    })

    return (
        <AppThemeContext.Provider value={{ appTheme, toggleTheme}}>
         <ThemeProvider theme={appTheme === 'light' ? lightTheme : darkTheme }>
           {children}            
         </ThemeProvider>
         </AppThemeContext.Provider>
    )
}