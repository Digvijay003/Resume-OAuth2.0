import { addWorkExperienceComponent, removeWorkExperienceComponent } from '@/reducers/AllComponentsSlice'
import { addWorkExperienceData, removeWorkExperienceData } from '@/reducers/AllDataSlice'
import { Button, Center, Divider, Flex, Heading, Input, Textarea, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { MdAddCircleOutline, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { BsCheckCircleFill } from "react-icons/bs";
import Image from 'next/image'
import axios from 'axios'

export default function WorkExperience({index}) {

  let timeout=null

  const myRef=useRef()

  const [showIcon,setShowIcon]=useState(false)

  const dispatch=useDispatch()

  const ref=useRef()

  const toast=useToast()


  const handleAddMore=()=>{
    dispatch(addWorkExperienceComponent({payload:{id:index}}))
  }

  const handleDelete=(index)=>{
    dispatch(removeWorkExperienceComponent({payload:{id:index}}))
    dispatch(removeWorkExperienceData(index))
  }

  const formik=useFormik({
    initialValues:{
      company:'',
      roles:'',
      from:'',
      to:''
    },
    onSubmit:(values)=>{

      const dateFrom=new Date(values.from)
      const dateTo=new Date(values.to)
      const result=dateTo.getFullYear()-dateFrom.getFullYear()

      if(result<3){
        alert('Check Dates First')
        return
      }
      clearTimeout(timeout)
      setShowIcon(true)

      timeout=setTimeout(()=>{
        setShowIcon(false)

      },2000)
     dispatch(addWorkExperienceData({payload:values,index:index}))
     toast({
      isClosable:true,
      status:'success',
      title:'Data Saved Successfully !!'
     })
   

    }
  })

  const getResponseFromChatGpt=()=>{
    const url = 'http://localhost:3000/api/getResponse';
  

    const data={
        model: 'gpt-3.5-turbo',
        messages:[{"role":"user","content":myRef.current.value}]
    }

    const headers=  {
      'Content-Type': 'application/json'
    }

    axios.post(url,data,{headers:headers})
    .then(res=>{
     
      myRef.current.value=res?.data?.myresponse?.choices[0]?.message?.content

    } )
    .catch(err=>console.log(err,'Some error ocuurs'))

  }
  return (
    <div>
      <Flex justify='space-between'>
      <Heading>Work Experience if any</Heading>
      <i style={{color:'red'}}>* You can add upto 4 work experience details</i>
      <Flex gap={2}>
      <Button colorScheme='red'onClick={()=>handleDelete(index)}isDisabled={index===0}>Delete<MdDelete /></Button>
  

  <Button colorScheme='green'onClick={()=>handleAddMore(index)}>Add<MdAddCircleOutline/></Button>

      </Flex>

      </Flex>
      <form onSubmit={formik.handleSubmit}>
       
          <label htmlFor='company'>Company Name</label>
        <Input focusBorderColor='black'placeholder='Enter Company Name'id='company'isRequired={true}onChange={formik.handleChange}value={formik.company}ref={ref}/>
        <label htmlFor='roles'>Summary</label>
        
        <Textarea focusBorderColor='black'placeholder='Describe yours roles and responsibilities' ref={myRef}isRequired={true}id='roles'onChange={formik.handleChange}value={formik.roles}/>
        <Flex gap={4}justify='flex-start'align='center'>
        <Image src='/chatGPT-Icon.png'width={50}height={50}alt='chatGPT'onClick={getResponseFromChatGpt}/>
        <b>Click here to get help from ChatGPT</b>

        </Flex>
        <label>From</label>
        <Input
        focusBorderColor='black'
 placeholder="From"
 size="md"
 type="date"
 id='from'
 onChange={formik.handleChange}
 value={formik.from}
 isRequired={true}
/>
<label>To</label>
        <Input
        focusBorderColor='black'
 placeholder="to"
 size="md"
 type="date"
 id='to'
 onChange={formik.handleChange}
 value={formik.to}
 isRequired={true}
/>
<Center height='50px'>
  <Divider orientation='vertical' />
</Center>
<Flex gap={4} align='center'>
<Button type='submit'colorScheme='green'isDisabled={showIcon}>Save</Button>
{showIcon?<BsCheckCircleFill color='green'size='30'/>:null}

</Flex>

</form>


    </div>
  )
}
