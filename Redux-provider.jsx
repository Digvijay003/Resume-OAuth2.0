"use client"
import React from 'react'

import { Provider } from 'react-redux'
import myStore from './store'


export default function Reduxprovider({children}) {
  return (
    <Provider store={myStore}>
    
      {children}

     
     
        </Provider>
  )
}
