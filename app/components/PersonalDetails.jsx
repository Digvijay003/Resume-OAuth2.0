import React, { useState } from 'react'
import { Button, Center, Divider, Flex, FormControl, FormLabel, Heading, Input, Select, Textarea, useToast } from '@chakra-ui/react'
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { addPersonalData } from '@/reducers/AllDataSlice';
import { BsCheckCircleFill } from "react-icons/bs";

export default function PersonalDetails() {

  const dispatch=useDispatch()

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
      setShowIcon(true)

      timeout=setTimeout(()=>{
        setShowIcon(false)

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
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>

     
        <Heading>Personal Details</Heading>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <Input placeholder='Enter Full Name'id='name'isRequired={true}value={formik.name}onChange={formik.handleChange}onBlur={formik.handleBlur}/>
        <FormLabel htmlFor='phone'>Phone Number</FormLabel>
       
   
    <Input type='tel' placeholder='Phone number' isRequired={true}id='phone'onChange={formik.handleChange}value={formik.phone}onBlur={formik.handleBlur}/>
 
  <FormLabel htmlFor='email'>Email</FormLabel>
        <Input placeholder='Enter Email address'id='email'isRequired={true}onChange={formik.handleChange}type='email'value={formik.email}onBlur={formik.handleBlur}/>
        <FormLabel htmlFor='profile'>Job Profile</FormLabel>
        <Input placeholder='Enter Job Profile'id='profile'isRequired={true}onChange={formik.handleChange}value={formik.profile}onBlur={formik.handleBlur}/>
        <FormLabel htmlFor='summary'>Summary</FormLabel>
        <Textarea placeholder='Describe yourself here' id='summary'onChange={formik.handleChange}value={formik.summary}isRequired={true}onBlur={formik.handleBlur}/>

<FormLabel htmlFor='skill'>Choose skilss</FormLabel>
<Select placeholder='Select Technical Skills'id='skill'onChange={formik.handleChange}value={formik.skill}isRequired={true}onBlur={formik.handleBlur}>
  <option value='react.js'>React.js</option>
  <option value='next.js'>Next.js</option>
  <option value='css'>CSS</option>
</Select>
<Center height='10px'>
  <Divider orientation='vertical' />
</Center>
<Flex gap={4} align='center'>
<Button type='submit'colorScheme='green'isDisabled={showIcon}>Save</Button>
{showIcon?<BsCheckCircleFill color='green'size='30'/>:null}

</Flex>

</FormControl>
</form>

    </div>
  )
}
