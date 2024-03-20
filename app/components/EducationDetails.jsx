import { Button, Center, Divider, Flex, Heading, Input, Select, Spacer, Textarea, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { addEducationalData, removeEducationalData } from '@/reducers/AllDataSlice';
import { MdAddCircleOutline, MdDelete } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";

import { addEducationalComponent, removeEducationalComponent } from '@/reducers/AllComponentsSlice';
import Image from 'next/image';

export default function EducationDetails({index}) {
  const dispatch=useDispatch()
  const ref=useRef()
  const toast=useToast()

  const [showIcon,setShowIcon]=useState(false)

  let timeout=null
 

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
      clearTimeout(timeout)
      setShowIcon(true)

      timeout=setTimeout(()=>{
        setShowIcon(false)

      },2000)
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
        <Flex gap={4}justify='flex-start'align='center'>
        <Image src='/chatGPT-Icon.png'width={50}height={50}alt='chatGPT'/>
        <b>Click here to get help from ChatGPT</b>

        </Flex>
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
<Flex gap={4}align='center'>
<Button type='submit'colorScheme='green'isDisabled={showIcon}>Save</Button>
{showIcon?<BsCheckCircleFill color='green'size='30'/>:null}

</Flex>

</form>


    </div>
  )
}
