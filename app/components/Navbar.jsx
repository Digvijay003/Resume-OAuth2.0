"use client"
import { Box, Button, Flex, Heading, Spacer, Text, useColorMode } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { FaSun,FaMoon,FaHome } from "react-icons/fa";

import '../globals.css'

import Link from 'next/link'




export default function Navbar() {
    const {data:session}=useSession()

    console.log(session,'linkedin session')
  
    const{colorMode,toggleColorMode}=useColorMode()
  
  return (
    <Flex width='100vw'justify='space-between'alignItems='center'p='4'color='black'bg='#fd0'style={{position:'fixed',height:'100px',zIndex:99999999}}>
          <Flex justify='flex-start'alignItems='center'gap='5'>
          <Image
          className="rounded-full"
          src={session?.user?.image}
          width={70}
          height={70}
          style={{border:'2px solid black'}}
          
          
        />
        <Flex direction='column'>
        <Heading className='name'>{session?.user?.name}</Heading>
        <Text className='email'>{session?.user?.email}</Text>

        </Flex>
       

    
  </Flex>

  <Flex justify='space-between'gap={2}>
    
    <Link className='home'href='/'><FaHome/></Link>
    <Button onClick={()=>signOut()}size='md'className='signOut'>Sign Out</Button>
    <Button onClick={toggleColorMode}size='md'className='icons'>{colorMode==='dark'?<FaSun />:<FaMoon/>}</Button>
   
  </Flex>

    </Flex>
  )
}
