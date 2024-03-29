import { Button, Center, Divider, Flex, Heading, Input, Select, Spacer, Textarea, useToast } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { addEducationalData, removeEducationalData } from '@/reducers/AllDataSlice';
import { MdAddCircleOutline, MdDelete } from "react-icons/md";

import { addEducationalComponent, removeEducationalComponent } from '@/reducers/AllComponentsSlice';

export default function EducationDetails({index}) {
  const dispatch=useDispatch()
  const ref=useRef()
  const toast=useToast()
 

  const handleClear=(index)=>{
    dispatch(removeEducationalComponent({payload:{id:index}}))
    dispatch(removeEducationalData(index))

  }

  const handleAddMore=(index)=>{
    dispatch(addEducationalComponent({payload:{id:index}}))
  }

  const formik=useFormik({
    initialValues:{
      university:'',
      type:'',
      roles:'',
      from:'',
      to:''
    },
    onSubmit:(values)=>{
     dispatch(addEducationalData({payload:values,index:index}))
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
        <Flex justify='space-between'>
        <Heading>Education</Heading>
        <i style={{color:'red'}}>* You can add upto 4 education details</i>
        <Flex gap={1}>
        <Button onClick={()=>handleClear(index)}colorScheme='red'isDisabled={index===0}>Delete<MdDelete /></Button>
  

<Button onClick={()=>handleAddMore(index)}colorScheme='green'>Add<MdAddCircleOutline/></Button>

        </Flex>


        </Flex>
       
        <label htmlFor='university'>University Name</label>
        <Input placeholder='Enter University Name'id='university'isRequired={true}onChange={formik.handleChange}value={formik.university}ref={ref}/>
        <label htmlFor='type'>Choose type</label>
<Select placeholder='Select Type'id='type'onChange={formik.handleChange}value={formik.type}isRequired={true}>
  <option value='graduation'>Graduation</option>
  <option value='intermediate'>Intermediate</option>
 
</Select>
        <label htmlFor='roles'>Summary</label>
        <Textarea placeholder='Describe yours roles and responsibilities' id='roles'onChange={formik.handleChange}value={formik.roles}isRequired={true}/>
        <label>From</label>
        <Input
 placeholder="From"
 size="md"
 type="datetime-local"
 id='from'
 onChange={formik.handleChange}
 value={formik.from}
 isRequired={true}
/>
<label>To</label>
        <Input
 placeholder="to"
 size="md"
 type="datetime-local"
 id='to'
 onChange={formik.handleChange}
 value={formik.to}
 isRequired={true}
/>
<Center height='10px'>
  <Divider orientation='vertical' />
</Center>
<Button type='submit'colorScheme='green'>Save</Button>
</form>


    </div>
  )
}
