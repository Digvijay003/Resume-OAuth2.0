"use client"
import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import TypingAnimation from '../components/AnimationLoading'
import { Flex, Spinner } from '@chakra-ui/react'
import SignIn from '../components/SignIn'
import { useSession } from 'next-auth/react'


export default function page() {
    const [input,setInput]=useState('')
    const {status}=useSession()
   
    const [chatLogs,setChatLogs]=useState([])

    const [isLoading, setIsLoading] = useState(false)

  

    const handleSubmit= (e)=>{
        e.preventDefault()
       
        setChatLogs(prevChats=>[...prevChats,{type:'user',message:input}])

        sendMessages(input)

        setInput('')

    }

    const sendMessages =  (message)=>{
        

        const url = 'http://localhost:3000/api/createMessage';
        // const headers = {
        //   'Content-type': 'application/json',
        //   'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        // };

        const data={
            model: 'gpt-3.5-turbo',
            messages:[{"role":"user","content":message}]
        }

        const headers=  {
          'Content-Type': 'application/json'
        }

      

        setIsLoading(true)

        axios.post(url,data,{headers:headers}).then(res=>{
           
             setChatLogs((prevChatLog) => [...prevChatLog, { type: 'bot', message: res?.data?.data?.choices[0]?.message?.content }])
            setIsLoading(false)
        })
        .catch(err=>{
          setIsLoading(false)
            console.log(err,'error occurs')
        })

    }

    
    if(status==='unauthenticated'){
      return <div className='signin-container'>
      <SignIn/>
      </div>
    } 
     if (status==='loading'){
      return <Flex width='100vw'height='100vh'alignItems='center'justify='center'>
      
   
      <Spinner
    thickness='10px'
    speed='0.85s'
    emptyColor='black'
    color='#fd0'
   
    width='130px'
    height='130px'
  />
  
        </Flex>
      }

   
  return (
    <div> 
        <Navbar/>
        <div className="container mx-auto max-w-[700px] chatgpt">
      <div className="flex flex-col h-screen">
        <h1 className="bg-gradient-to-r  text-transparent bg-clip-text text-center py-3 font-bold text-6xl"style={{color:'#fd0',paddingTop:'30px'}}>ChatGPT</h1>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
          {
        chatLogs.map((message, index) => (
          <div key={index} className={`flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}>
            <div className={`${
              message.type === 'user' ? 'bg-white text-black' : 'bg-yellow-300 text-black'
            } rounded-lg p-4 max-w-sm`}>
            {message.message}
            </div>
            </div>
        ))
            }
            {
              isLoading &&
              <div key={chatLogs.length} className="flex justify-start">
                  <div className="bg-white rounded-lg p-4 text-white max-w-sm">
                   <TypingAnimation/>
                  </div>
              </div>
            }
      </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">  
        <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" className="rounded-lg px-4 py-2 text-black font-semibold focus:outline-none "style={{backgroundColor:'#fd0'}}>Send</button>
            </div>
        </form>
        </div>
    </div>
       
    </div>
  )
}
