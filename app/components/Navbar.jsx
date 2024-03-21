"use client"
import {  Button, Flex, Heading, Text, useColorMode } from '@chakra-ui/react'
import {  signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { FaSun,FaMoon,FaHome } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";



import Link from 'next/link'
import { useRouter } from 'next/navigation'




export default function Navbar() {
    const {data:session}=useSession()

   
  
    const{colorMode,toggleColorMode}=useColorMode()
    const router=useRouter()


    const chatGPT=()=>{
      router.push('/createMessage')

    }
    const handleSignOut=()=>{
      signOut()
      localStorage.removeItem("data")
    }
  
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

  <Flex justify='space-between'gap={2}className='rightsidemenu'>
  <Image src='/chatGPT-Icon.png'width={40}height={40}alt='chatGPT'className='chatGpt-Icon-navbar'onClick={chatGPT}/>
    
    <Link className='home'href='/'><FaHome/></Link>
    <Button onClick={handleSignOut}size='md'className='signOut'><FaSignOutAlt/></Button>
    <Button onClick={toggleColorMode}size='md'className='icons'>{colorMode==='dark'?<FaSun />:<FaMoon/>}</Button>
   
  </Flex>

    </Flex>
  )
}
