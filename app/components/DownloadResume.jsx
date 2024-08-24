import React, { useEffect, useRef, useState } from 'react'
import { Button, Center, Container, Divider, Flex, Grid, GridItem, Heading, Skeleton, Text, useColorMode, useToast } from '@chakra-ui/react'
import Image from 'next/image'

import { useSession } from 'next-auth/react'

import { useReactToPrint } from 'react-to-print';
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';



export default function DownloadResume() {

  const{colorMode,toggleColorMode}=useColorMode()

  const [items,setItems]=useState()

  const elementToBePrinted=useRef()
  const mydata=JSON.parse(localStorage.getItem("data"))
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mydata = JSON.parse(localStorage.getItem('data'));
        if (mydata) {
          const allKeys = Object.keys(mydata);
          const newItems = [];
          allKeys.forEach((item) => {
            if (item.startsWith('education')) {
              newItems.push({ type: 'education', content: mydata[item] });
            } else if (item.startsWith('work')) {
              newItems.push({ type: 'work', content: mydata[item] });
            }
          });
          setItems(newItems);
        }
      } catch (error) {
        console.error('Error fetching data from local storage:', error);
        // Handle error (e.g., display a toast notification)
      } 
    };

    fetchData();
  }, []); // Empty dependency array to ensure this effect runs only once



    const {data:session}=useSession()

    const [bgColor,setBgColor]=useState('')

    const setColor=(value)=>{
      if(colorMode==='dark'){
        return
      }
      setBgColor(value)
    

    }

    const toast=useToast()


        
  



  

    const download=  useReactToPrint({
      content:()=>elementToBePrinted.current,
    
    })

    const dragEnd=(result)=>{
      if (!result.destination) {
        return
    }
    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems)

    }

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
  <DragDropContext onDragEnd={dragEnd}>

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
      

  
    <Flex justify='space-between'><b>Name</b>{mydata?.personaldata?.payload?.name}</Flex><br/>
    <Flex justify='space-between'style={{width:'100%',overflow:'auto'}}><b>Email</b>{mydata?.personaldata?.payload?.email}</Flex><br/>
    <Flex justify='space-between'><b>Contact Number</b>{mydata?.personaldata?.payload?.phone}</Flex><br/>
   
      <Flex justify='space-between'><b>Job Profile</b>{mydata?.personaldata?.payload.profile}</Flex><br/>
    <Flex justify='space-between'><b>Primary Skill</b>{mydata?.personaldata?.payload.skill}</Flex><br/>
    <Flex justify='space-between'style={{width:'100%',overflow:'auto'}}gap={5}><b>Summary</b>{mydata?.personaldata?.payload.summary}</Flex><br/>
    </GridItem>

    <Droppable droppableId={`${Math.floor(Math.random()*100)+1}-droppable`}>


      {(provided,snapshots)=>(
         <div ref={provided.innerRef}{...provided.droppableProps}style={{overflowY:'scroll',width:'60vw'}}>
          <GridItem className='all-details'>
            {items?.map((item,index)=>{
              if(item.type==='education'){
                return <Draggable draggableId={`${index}`}index={index}key={index}>
    {(provided,snapshots)=>(
       <div ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      id={index}
      key={index}
      style={{backgroundColor:snapshots.isDragging?'#fd0':'white'}}>
        <div style={{paddingLeft:'10px',paddingRight:'20px'}}id={index}>
     <Heading size='lg'>User education Info</Heading>
    <Flex justify='space-between'><b>University Name</b>{item?.content.payload?.university}</Flex><br/>
    <Flex justify='space-between'><b>University Type</b>{item?.content.payload?.type}</Flex><br/>
    <Flex justify='space-between'gap={4}style={{width:'100%',overflow:'auto'}}><b>Roles and responsibilities</b>{item?.content.payload?.roles}</Flex><br/>
    <Flex justify='space-between'><b>From</b>{item?.content.payload?.from}</Flex><br/>
    <Flex justify='space-between'><b>To</b>{item?.content.payload?.to}</Flex><br/>
    <Skeleton startColor='gray.300' endColor='gray.500' height='5px' />
  



  </div>

      </div>
            )}
  </Draggable>
              }
              else if (item.type==='work'){
                return <Draggable draggableId={`${index}`}index={index}key={index}>
                {(provided,snapshots)=>(
                   <div ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  id={index}
                  key={index}
                  style={{backgroundColor:snapshots.isDragging?'#fd0':'white'}}>
                     <div style={{paddingLeft:'10px',paddingRight:'20px'}}id={index}>
                  <Heading size='lg'>Work Experience Info</Heading>
                <Flex justify='space-between'><b>Company Name</b>{item?.content.payload?.company} </Flex><br/>
                <Flex justify='space-between'gap={4}style={{width:'100%',overflow:'auto'}}><b>Roles </b>{item?.content.payload?.roles}</Flex><br/>
                <Flex justify='space-between'><b>From</b>{item?.content.payload?.from}</Flex><br/>
                <Flex justify='space-between'><b>To</b>{item?.content.payload?.to}</Flex><br/>
                <Skeleton startColor='gray.300' endColor='gray.500' height='5px' />
            
                </div>
                    
                  </div>
            )}
              </Draggable>

              }
            })}


<div style={{paddingLeft:'10px',paddingRight:'20px'}}>
  <Heading size='lg'>Decalartion</Heading>
  <Flex justify='space-between'><b>Linkedin URL</b>{mydata?.decalartionData?.payload.linkedin}</Flex><br/>
  <Flex justify='space-between'gap={4}style={{width:'100%',overflow:'auto'}}><b>Certificate1</b>{mydata?.decalartionData?.payload.certificate1}</Flex><br/>
  <Flex justify='space-between'style={{width:'100%',overflow:'auto'}}gap={4}><b>Certificate2</b>{mydata?.decalartionData?.payload.certificate2}</Flex><br/>
 
  
</div>
</GridItem>
{provided.placeholder}

        </div>
      )}

    
    </Droppable>

</Grid>
</div>

    </div>

      

    </DragDropContext>
 
   </div>
  )
}
