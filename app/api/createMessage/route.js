// import axios from "axios";
// import { NextResponse } from "next/server";


// export async function POST(request,response){
//     if(request.method!=='POST'){
//         return NextResponse.json({message:'Method should be POST only'})
//     }
    
//     console.log(await request.json(),'ye bhe dekho bahar')
   
//     try{
//         const {messages}=await request.json()
//         console.log(await request.json(),'ye bhe dekho andar')
//         const url = 'https://api.openai.com/v1/chat/completions';
//         const headers = {
//           'Content-type': 'application/json',
//           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//         };

//         const res= await axios.post(url,messages,{headers})

        

//         return NextResponse.json(res.data)

//     }catch(err){
//         return NextResponse.json({message:'Some error occurs'+err})
//     }
// }