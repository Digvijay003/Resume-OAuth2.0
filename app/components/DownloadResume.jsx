import React from 'react'
import { Button, Center, Container, Divider, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import Image from 'next/image'

import { useSession } from 'next-auth/react'
import html2pdf from 'html2pdf.js';


export default function DownloadResume() {
   
  
    const {data:session}=useSession()
    const data=JSON.parse(localStorage.getItem("data"))

    console.log(data,'Let see data first')

   


    const toast=useToast()
   
    const educationFields=[]
    const workFields=[]
    const allKeys=Object.keys(data)
  
    allKeys.forEach(item=>{
     
      if(item?.startsWith('e')){
      
        educationFields.push(data[item])
       
      }
      else if(item?.startsWith('w')){
        workFields.push(data[item])
      }
    })

    const handleDownLoad=(e)=>{
      e.preventDefault()
      if(Object.keys(data).length===0){
        toast({
          isClosable:true,
          status:'error',
          title:'Please fill the form first !!'
         })
        return
      }
    
      const element = document.getElementById('resume-data');
      html2pdf(element, {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      });

    }
  return (<>
    <Container style={{paddingTop:'130px',fontSize:'1.2rem'}}maxW='70vw'id='resume-data'>
     
        <div>
          <Flex justify='space-between'>
          <Heading>User personal Info</Heading>
          <Image
          className="rounded-full"
        alt='user-image'
          width={80}
          height={80}
          src={session?.user?.image}
          style={{border:'2px solid #fd0'}}
  
        />

          </Flex>
          

      
        <Flex justify='space-between'><b>Name</b>{data?.personaldata?.payload?.name}</Flex><br/>
        <Flex justify='space-between'><b>Email</b>{data?.personaldata?.payload?.email}</Flex><br/>
        <Flex justify='space-between'><b>Contact Number</b>{data?.personaldata?.payload?.phone}</Flex><br/>
       
          <Flex justify='space-between'><b>Job Profile</b>{data?.personaldata?.payload.profile}</Flex><br/>
        <Flex justify='space-between'><b>Primary Skill</b>{data?.personaldata?.payload.skill}</Flex><br/>
        <Flex justify='space-between'><b>Summary</b>{data?.personaldata?.payload.summary}</Flex><br/>
        </div>
        <Center height='40px'>
  <Divider orientation='vertical' />
</Center>
        {educationFields?.map((item,index)=>{
          return <div>
             <Heading>User education Info</Heading>
            <Flex justify='space-between'><b>University Name</b>{item?.payload?.university}</Flex><br/>
            <Flex justify='space-between'><b>University Type</b>{item?.payload?.type}</Flex><br/>
            <Flex justify='space-between'><b>Roles and responsibilities</b>{item?.payload?.roles}</Flex><br/>
            <Flex justify='space-between'><b>From</b>{item?.payload?.from}</Flex><br/>
            <Flex justify='space-between'><b>To</b>{item?.payload?.to}</Flex><br/>
            <Center height='20px'>
  <Divider orientation='vertical' />
</Center>


          </div>
        })}
             <Center height='40px'>
  <Divider orientation='vertical' />
</Center>

        {workFields?.map((item,index)=>{
          return <div key={index}>
              <Heading>Work Experience Info</Heading>
            <Flex justify='space-between'><b>Company Name</b>{item?.payload?.company} </Flex><br/>
            <Flex justify='space-between'><b>Roles </b>{item?.payload?.roles}</Flex><br/>
            <Flex justify='space-between'><b>From</b>{item?.payload?.from}</Flex><br/>
            <Flex justify='space-between'><b>To</b>{item?.payload?.to}</Flex><br/>
            <Center height='20px'>
  <Divider orientation='vertical' />
</Center>
            </div>
        })}
             <Center height='40px'>
  <Divider orientation='vertical' />
</Center>

        <div>
          <Heading>Decalartion</Heading>
          <Flex justify='space-between'><b>Linkedin URL</b>{data?.decalartionData?.payload.linkedin}</Flex><br/>
          <Flex justify='space-between'><b>Certificate1</b>{data?.decalartionData?.payload.certificate1}</Flex><br/>
          <Flex justify='space-between'><b>Certificate2</b>{data?.decalartionData?.payload.certificate2}</Flex><br/>
          
        </div>
        <Center height='40px'>
  <Divider orientation='vertical' />
</Center>
       
      

    </Container>
     <Flex gap={10}style={{marginLeft:'17%',marginBottom:'5%'}}>
     <Button size='lg'bg='black'color='yellow'className='download'onClick={(e)=>handleDownLoad(e)}>Download</Button>

   </Flex>
   </>
  )
}
