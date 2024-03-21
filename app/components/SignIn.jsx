
"use client"
import { Button, Card,  CardFooter, CardHeader, Flex, Heading,  Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

import React from 'react'
import { FaLinkedin } from "react-icons/fa6";

import { FcGoogle } from "react-icons/fc";

export default function SignIn() {


   
  return (
    <Flex height='100vh'width='100vw'alignItems='center'justify='center'>
    
       <Card align='center'variant='outline'size='lg'className='signIn'>
  <CardHeader>
    <Heading size='lg'style={{color:'black'}}>Log In to Continue</Heading>
  </CardHeader>
 
  <CardFooter>
    <Flex className='card-footer'>
      <Flex>
  
<FcGoogle className='linkedin-icon'/>
<Button onClick={()=>signIn('google')}size='lg'className='signIn-button'>
  
   
Sign in With Google
    </Button>

      </Flex>
  

    <Flex>
    <FaLinkedin className='linkedin-icon'/>

<Button onClick={()=>signIn('linkedin')}size='lg'className='signIn-button'>


Sign in With Linkedin
</Button>

    </Flex>

    

    </Flex>
   
  </CardFooter>
 
</Card>
</Flex>


  )
}
