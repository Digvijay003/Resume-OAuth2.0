"use client"
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import mytheme from '@/theme'

export default function MyChakraProvider({children}) {
  return (
    <ChakraProvider theme={mytheme}>
        {children}

    </ChakraProvider>
  )
}
