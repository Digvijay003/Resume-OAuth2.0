import React, { useRef, useState } from 'react'
import { Button, Center, Divider, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftAddon, Select, Textarea, useToast } from '@chakra-ui/react'
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { addPersonalData } from '@/reducers/AllDataSlice';
import { BsCheckCircleFill } from "react-icons/bs";
import Image from 'next/image'
import axios from 'axios';

export default function PersonalDetails() {

  const dispatch=useDispatch()

  const myRef=useRef()

  const [error,setError]=useState('')

  const [showIcon,setShowIcon]=useState(false)

  const toast=useToast()
  let timeout=null


  const formik=useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      profile:'',
      summary:'',
     
      skill:''

    },
    onSubmit:(values)=>{
  
      
      clearTimeout(timeout)


      const regEx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/


      const regEXForName=/^[A-Za-z]+$/

      if(!regEXForName.test(values.name.toString())){
        setError("Name should contains only aplhabets")
      }


      if(!regEx.test(values.email.toString())){
        setError("Email should contains uppercase,lowercase,symbol and digits")

      }

  
      setShowIcon(true)

      timeout=setTimeout(()=>{
        setShowIcon(false)
        setError('')
       

      },2000)


     
      dispatch(addPersonalData({payload:values}))
      toast({
        isClosable:true,
        status:'success',
        title:'Data Saved Successfully !!'
       })

    },
    onBlur:()=>{
      console.log("hello")
    },
    onChange:(e)=>{
      console.log(e.target.value)

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
      <form onSubmit={formik.handleSubmit}>
        <FormControl>

     
        <Heading>Personal Details</Heading>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <Input type='text'placeholder='Enter Full Name'focusBorderColor='black'id='name'isRequired={true}value={formik.name}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
        <FormLabel htmlFor='phone'>Phone Number</FormLabel>
        <InputGroup>
        <InputLeftAddon>
      +91
    </InputLeftAddon>
       
   
    <Input type='tel' placeholder='Phone number'focusBorderColor='black'maxlength='10'isRequired={true}id='phone'onChange={formik.handleChange}value={formik.phone}onBlur={formik.handleBlur}/>
    </InputGroup>
  <FormLabel htmlFor='email'>Email</FormLabel>
        <Input placeholder='Enter Email address'focusBorderColor='black'id='email'isRequired={true}onChange={formik.handleChange}type='email'value={formik.email}onBlur={formik.handleBlur}/>
        <FormLabel htmlFor='profile'>Job Profile</FormLabel>
        <Input placeholder='Enter Job Profile'focusBorderColor='black'id='profile'isRequired={true}onChange={formik.handleChange}value={formik.profile}onBlur={formik.handleBlur}/>
        <FormLabel htmlFor='summary'>Summary</FormLabel>

        <Textarea placeholder='Describe yourself here'focusBorderColor='black' id='summary'ref={myRef}onChange={formik.handleChange}value={formik.summary}isRequired={true}onBlur={formik.handleBlur}/>
        <Flex gap={4}justify='flex-start'align='center'>
        <Image src='/chatGPT-Icon.png'width={50}height={50}alt='chatGPT'className='chatGpt-Icon'onClick={getResponseFromChatGpt}/>
        <b>Click here to get help from ChatGPT</b>

        </Flex>
       

<FormLabel htmlFor='skill'>Choose skilss</FormLabel>
<Select placeholder='Select Technical Skills'id='skill'focusBorderColor='black'onChange={formik.handleChange}value={formik.skill}isRequired={true}onBlur={formik.handleBlur}>
  <option value='react.js'>React.js</option>
  <option value='next.js'>Next.js</option>
  <option value='css'>CSS</option>
</Select>
<Center height='10px'>
  <Divider orientation='vertical' />
</Center>
{error?<b style={{color:'red'}}>{error}</b>:''}
<Flex gap={4} align='center'>
<Button type='submit'colorScheme='green'isDisabled={showIcon}>Save</Button>
{showIcon?<BsCheckCircleFill color='green'size='30'/>:null}

</Flex>

</FormControl>
</form>

    </div>
  )
}