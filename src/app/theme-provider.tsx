'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: {
      main: "#ff7a2d",
      "50": "#ffdfcd",
      "100": "#ffc6a5",
      "200": "#ffad7d",
      "300": "#ff9456",
      "400": "#ff7a2d",
      "500": "#f86e1d",
      "600": "#ef610f",
      "700": "#d25a15",
      "800": "#b65219",
      "900": "#9c4b1b"
    }
  }
})

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}