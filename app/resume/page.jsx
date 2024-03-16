"use client"
import { Flex, Spinner } from '@chakra-ui/react'
import { SessionProvider, useSession } from 'next-auth/react'
import React from 'react'
import Navbar from '../components/Navbar'
import DownloadResume from '../components/DownloadResume'
import Reduxprovider from '@/Redux-provider'
import SignIn from '../components/SignIn'


export default function Resume() {
  const {status}=useSession()
  if(status==='authenticated'){
    return (
      <div>
        <Reduxprovider>
        <Navbar/>
       
       <DownloadResume/>

        </Reduxprovider>
      
  
      </div>
    )

  } else if(status==='unauthenticated'){
    return <div className='signin-container'>
    <SignIn/>
    </div>
  } else if (status==='loading'){
    return <Flex width='100vw'height='100vh'alignItems='center'justify='center'>
    
 
    <Spinner
  thickness='10px'
  speed='0.85s'
  emptyColor='black'
  color='#fd0'
 
  width='130px'
  height='130px'
/>

      </Flex>
    }
  }


