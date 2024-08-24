"use client"
import {  useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'
import SignIn from './SignIn'
import Navbar from './Navbar'
import PersonalDetails from './PersonalDetails'
import EducationDetails from './EducationDetails'
import WorkExperience from './WorkExperience'
import { Button, Center, Checkbox, Container, Divider, Flex, FormControl, Heading, Spinner, Text } from '@chakra-ui/react'
import Decalartion from './Decalartion'
import {  useSelector } from 'react-redux'
import {  useRouter } from 'next/navigation'
import getData from '@/utils/getData'



export default function UserInfo() {
    const {status,data:session}=useSession()
    const state=useSelector(state=>state?.allComponents)
    const allData=useSelector(state=>state.allData)

    const checkboxRef=useRef()

    const router=useRouter()

   
   
      const token=(session?.accessToken)

      // const data=useQuery({
      //   queryKey:['data',token],
      //   queryFn:async ()=>await getData(token)
      // })

     
      // console.log(data?.data,'Let see API Data')

      if(token){
        async function getdata(){
          const res=await getData(token)
          return res
        }
       
        getdata().then(res=>console.log(res,'Let see Api data'))

      }


    const handleAllSubmit=()=>{
      if(!checkboxRef.current.checked){
        alert("Please select the checkbox also")
        return
      }
      if(Object.keys(allData).length<4){
        alert('Please fill the form completely first')
        return
      }
   
      localStorage.setItem("data",JSON.stringify(allData))
      
     
      router.push('http://localhost:3000/resume')

      
    }

    // const moveToTemplates=()=>{
    //   router.push('/templates')
    // }

    if(status==='authenticated'){
        return <div >
        <Navbar />
    
        <Container maxW='70vw'className='container'>

          {/* <Flex justify='space-between'>
          <Heading size='md'>Fill the form Manually or use Templates</Heading>
          <Button size='lg'bg='black'color='yellow'className='download'onClick={moveToTemplates}>Templates</Button>

          </Flex> */}

          <Center height='10px'>
  <Divider orientation='vertical' />
</Center>

       

        <PersonalDetails />
        <Center height='40px'>
  <Divider orientation='vertical' />
</Center>
         <Container maxW='70vw'>
         {(Array.from({length:state.educationalComponent.totalCount},(_,index)=>index)).map((item,index)=>{
          return <div key={item}style={{margin:'-15px'}}>
           <EducationDetails index={index}/>
           <Center height='30px'>
  <Divider orientation='vertical' />
</Center>
    
          
          </div>
         })}
        

         </Container>
      
        <Center height='40px'>
  <Divider orientation='vertical' />
</Center>
<Container maxW='70vw'>
  {(Array.from({length:state.workExperienceComponent.totalCount},(_,index)=>index)).map((item,index)=>{
    return <div key={item}style={{margin:'-15px'}}>
       <WorkExperience index={index}/>
       <Center height='30px'>
  <Divider orientation='vertical' />
</Center>

    </div>
  })}
</Container>
       
        <Center height='40px'>
  <Divider orientation='vertical' />
</Center>
<Decalartion/>
<Center height='40px'>
  <Divider orientation='vertical' />
</Center >
<Checkbox colorScheme='green'ref={checkboxRef}>
    I hereby declared all the info to be true
  </Checkbox>
  <Center height='30px'>
  <Divider orientation='vertical' />
</Center>
       <Flex gap={2}>
       <Button onClick={(e)=>handleAllSubmit(e)}size='lg'bg='black'color='yellow'className='download'>Submit</Button>
      

       </Flex>
       <Center height='20px'>
  <Divider orientation='vertical' />
</Center>

       
        </Container>
     
        </div>
    }else if(status==='unauthenticated'){
        return (
            <div className='signin-container'>
           <SignIn/>
            </div>
            
          )

    } else if(status==='loading'){
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
