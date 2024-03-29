import { addWorkExperienceComponent, removeWorkExperienceComponent } from '@/reducers/AllComponentsSlice'
import { addWorkExperienceData, removeWorkExperienceData } from '@/reducers/AllDataSlice'
import { Button, Center, Divider, Flex, Heading, Input, Textarea, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { MdAddCircleOutline, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

export default function WorkExperience({index}) {

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
     dispatch(addWorkExperienceData({payload:values,index:index}))
     toast({
      isClosable:true,
      status:'success',
      title:'Data Saved Successfully !!'
     })
   

    }
  })
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
        <Input placeholder='Enter Company Name'id='company'isRequired={true}onChange={formik.handleChange}value={formik.company}ref={ref}/>
        <label htmlFor='roles'>Summary</label>
        <Textarea placeholder='Describe yours roles and responsibilities' isRequired={true}id='roles'onChange={formik.handleChange}value={formik.roles}/>
        <label>From</label>
        <Input
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
<Button type='submit'colorScheme='green'>Save</Button>
</form>


    </div>
  )
}
