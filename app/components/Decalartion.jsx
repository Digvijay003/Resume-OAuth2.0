import { addDecalartionData } from '@/reducers/AllDataSlice'
import { Button, Center, Checkbox, Divider, Heading, Input, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function Decalartion() {
  const dispatch=useDispatch()
  const toast=useToast()
  const formik=useFormik({
    initialValues:{
      linkedin:'',
      certificate1:'',
      certificate2:''
    },
    onSubmit:(values)=>{
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
        <Input placeholder='Enter Linkedin Profile URL'id='linkedin'isRequired={true}onChange={formik.handleChange}value={formik.linkedin}/>
        <label htmlFor='certificate1'>Certificate 1</label>
        <Input placeholder='Enter Certification here'id='certificate1'onChange={formik.handleChange}value={formik.certificate1}isRequired={true}/>
        <label htmlFor='certificate2'>Certificate 2</label>
        <Input placeholder='Enter Certification here'id='certificate2'onChange={formik.handleChange}value={formik.certificate2}/>
        <Center height='10px'>
  <Divider orientation='vertical' />
</Center>
       
        <Button type='submit'colorScheme='green'>Save</Button>
        <Center height='10px'>
  <Divider orientation='vertical' />
</Center>
</form>
     
    </div>
  )
}
