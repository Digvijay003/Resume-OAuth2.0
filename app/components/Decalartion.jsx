import { addDecalartionData } from '@/reducers/AllDataSlice'
import { Button, Center, Checkbox, Divider, Flex, Heading, Input, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BsCheckCircleFill } from "react-icons/bs";

export default function Decalartion() {
  let timeout=null
  const [showIcon,setShowIcon]=useState(false)
  const dispatch=useDispatch()
  const toast=useToast()
  const formik=useFormik({
    initialValues:{
      linkedin:'',
      certificate1:'',
      certificate2:''
    },
    onSubmit:(values)=>{
      clearTimeout(timeout)
      setShowIcon(true)

      timeout=setTimeout(()=>{
        setShowIcon(false)

      },2000)
      dispatch(addDecalartionData({payload:values}))
      toast({
        isClosable:true,
        status:'success',
        title:'Data Saved Successfully !!'
       })

    }
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
         <Heading>Decalartion</Heading>
        <label htmlFor='linkedin'>Linkedin URL</label>
        <Input focusBorderColor='black'placeholder='Enter Linkedin Profile URL'id='linkedin'isRequired={true}onChange={formik.handleChange}value={formik.linkedin}/>
        <label htmlFor='certificate1'>Certificate 1</label>
        <Input focusBorderColor='black'placeholder='Enter Certification here'id='certificate1'onChange={formik.handleChange}value={formik.certificate1}isRequired={true}/>
        <label htmlFor='certificate2'>Certificate 2</label>
        <Input focusBorderColor='black'placeholder='Enter Certification here'id='certificate2'onChange={formik.handleChange}value={formik.certificate2}/>
        <Center height='10px'>
  <Divider orientation='vertical' />
</Center>
       <Flex gap={4} align='center'>
       <Button type='submit'colorScheme='green'isDisabled={showIcon}>Save</Button>
        {showIcon?<BsCheckCircleFill color='green'size='30'/>:null}

       </Flex>
    
        <Center height='10px'>
  <Divider orientation='vertical' />
</Center>
</form>
     
    </div>
  )
}
