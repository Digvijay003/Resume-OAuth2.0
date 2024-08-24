import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(request,response){
    if(request.method!=='POST'){
        return NextResponse.json({message:'Method should be POST only'})
    }

    try{
       
        const data=await request.json()

        const url = 'https://api.openai.com/v1/chat/completions';
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        };

        const res= await axios.post(url,data,{headers:headers})

        return NextResponse.json({"data":res.data})

    }catch(err){
        return NextResponse.json({message:'Some error occurs'+err})
    }
}