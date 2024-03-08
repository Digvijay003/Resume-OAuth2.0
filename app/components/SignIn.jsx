
"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading,  Text } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { FaLinkedin } from "react-icons/fa6";

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
      <Image
   width={35}
  height={30}
  style={{backgroundColor:'white',marginRight:'5px'}}
  
  alt='Google Email'
  
  src='/googleicon.png'
  
/>
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
