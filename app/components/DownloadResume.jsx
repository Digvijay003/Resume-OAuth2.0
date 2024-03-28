import React, { useEffect, useRef, useState } from 'react'
import { Button, Center, Container, Divider, Flex, Grid, GridItem, Heading, Skeleton, Text, useColorMode, useToast } from '@chakra-ui/react'
import Image from 'next/image'

import { useSession } from 'next-auth/react'

import { useReactToPrint } from 'react-to-print';
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';


export default function DownloadResume() {

  const{colorMode,toggleColorMode}=useColorMode()

  const elementToBePrinted=useRef()
   
  
    const {data:session}=useSession()
    const data=JSON.parse(localStorage.getItem("data"))

  

    const [bgColor,setBgColor]=useState('')

    const setColor=(value)=>{
      if(colorMode==='dark'){
        return
      }
      setBgColor(value)
    

    }

   


    const toast=useToast()
   
    const educationFields=[]
    const workFields=[]
  
    if(data){
    
      const allKeys=Object?.keys(data)

     allKeys?.forEach(item=>{
     
      if(item?.startsWith('e')){
      
        educationFields.push(data[item])
       
      }
      else if(item?.startsWith('w')){
        workFields.push(data[item])
      }
    })

    }

  

    const download=  useReactToPrint({
      content:()=>elementToBePrinted.current,
    
    })

    // const handleDownLoad=(e)=>{
    //   e.preventDefault()
    //   if(Object.keys(data).length===0){
    //     toast({
    //       isClosable:true,
    //       status:'error',
    //       title:'Please fill the form first !!'
    //      })
    //     return
    //   }
    

    
    
    //   // const element = document.getElementById('resume-data');
    //   // html2pdf(element, {
    //   //   margin: 1,
    //   //   filename: 'resume.pdf',
    //   //   image: { type: 'jpeg', quality: 0.98 },
    //   //   html2canvas: { scale: 2 },
    //   //   jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    //   // });

    // }
  return (<div className='resume-container'>
  <DragDropContext>
    <Droppable droppableId='droppable'>
      {(provided,snapshots)=>{
        return <div {...provided.droppableProps}ref={provided.innerRef}>
           <Flex justify='space-between'>
      <Flex justify='center'align='center'gap={4}padding='10px'>
        <b>Choose Any One of the Color</b>
        <div style={{backgroundColor:'blue'}}className='circle'onClick={()=>setColor('#bae4e5')}></div>
        <div style={{backgroundColor:'green'}}className='circle'onClick={()=>setColor('hsla(78, 51%, 90%)')}></div>
        <div style={{backgroundColor:'red'}}className='circle'onClick={()=>setColor('hsl(0, 100%, 95%)')}></div>
        <div style={{backgroundColor:'yellow'}}className='circle'onClick={()=>setColor('hsla(60, 100%, 90%)')}></div>
      </Flex>
     
     
     <Button size='lg'bg='black'color='yellow'className='download'onClick={download}>Download</Button>

  
    </Flex>
    <div className='downloaded-resume'>
    <div id='resume-data' ref={elementToBePrinted}>

   
<Grid style={{paddingTop:'40px',fontSize:'1rem'}}templateColumns='26% 1fr'gap={10}w='100vw'maxH='80vh'templateRows='1fr'>


 
    <GridItem style={{backgroundColor:colorMode==='dark'?'':bgColor,padding:'10px'}}className='persnal-info'>
      <Flex justify='space-between'>
      <Heading size='lg'>User personal Info</Heading>
      <Image
      className=" rounded-full user-image"
    alt='user-image'
 width={60}
 height={60}
     
      src={session?.user?.image}
      style={{border:'2px solid #fd0'}}

    />

      </Flex>
      

  
    <Flex justify='space-between'><b>Name</b>{data?.personaldata?.payload?.name}</Flex><br/>
    <Flex justify='space-between'style={{width:'100%',overflow:'auto'}}><b>Email</b>{data?.personaldata?.payload?.email}</Flex><br/>
    <Flex justify='space-between'><b>Contact Number</b>{data?.personaldata?.payload?.phone}</Flex><br/>
   
      <Flex justify='space-between'><b>Job Profile</b>{data?.personaldata?.payload.profile}</Flex><br/>
    <Flex justify='space-between'><b>Primary Skill</b>{data?.personaldata?.payload.skill}</Flex><br/>
    <Flex justify='space-between'style={{width:'100%',overflow:'auto'}}gap={5}><b>Summary</b>{data?.personaldata?.payload.summary}</Flex><br/>
    </GridItem>

    <GridItem style={{overflowY:'scroll',width:'60vw'}}className='all-details'>

    {educationFields?.map((item,index)=>{

      return <Draggable draggableId={index}>
        {(provided,snapshots)=>{
          return <div ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
            <div style={{paddingLeft:'10px',paddingRight:'20px'}}>
         <Heading size='lg'>User education Info</Heading>
        <Flex justify='space-between'><b>University Name</b>{item?.payload?.university}</Flex><br/>
        <Flex justify='space-between'><b>University Type</b>{item?.payload?.type}</Flex><br/>
        <Flex justify='space-between'gap={4}style={{width:'100%',overflow:'auto'}}><b>Roles and responsibilities</b>{item?.payload?.roles}</Flex><br/>
        <Flex justify='space-between'><b>From</b>{item?.payload?.from}</Flex><br/>
        <Flex justify='space-between'><b>To</b>{item?.payload?.to}</Flex><br/>
        <Skeleton startColor='gray.300' endColor='gray.500' height='5px' />
      



      </div>

          </div>
        }}
      </Draggable>

       
    })}


    {workFields?.map((item,index)=>{
      return <Draggable draggableId={index}>
        {(provided,snapshots)=>{
          return <div ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
             <div key={index}style={{paddingLeft:'10px',paddingRight:'20px'}}>
          <Heading size='lg'>Work Experience Info</Heading>
        <Flex justify='space-between'><b>Company Name</b>{item?.payload?.company} </Flex><br/>
        <Flex justify='space-between'gap={4}style={{width:'100%',overflow:'auto'}}><b>Roles </b>{item?.payload?.roles}</Flex><br/>
        <Flex justify='space-between'><b>From</b>{item?.payload?.from}</Flex><br/>
        <Flex justify='space-between'><b>To</b>{item?.payload?.to}</Flex><br/>
        <Skeleton startColor='gray.300' endColor='gray.500' height='5px' />

        </div>
            
          </div>
        }}
      </Draggable>
     
    })}


    <div style={{paddingLeft:'10px',paddingRight:'20px'}}>
      <Heading size='lg'>Decalartion</Heading>
      <Flex justify='space-between'><b>Linkedin URL</b>{data?.decalartionData?.payload.linkedin}</Flex><br/>
      <Flex justify='space-between'gap={4}style={{width:'100%',overflow:'auto'}}><b>Certificate1</b>{data?.decalartionData?.payload.certificate1}</Flex><br/>
      <Flex justify='space-between'style={{width:'100%',overflow:'auto'}}gap={4}><b>Certificate2</b>{data?.decalartionData?.payload.certificate2}</Flex><br/>
     
      
    </div>
    </GridItem>
  
  

   
  

</Grid>
</div>

    </div>

        </div>
      }}

    

 
   
    </Droppable>
    </DragDropContext>
  
   
    
   </div>
  )
}
