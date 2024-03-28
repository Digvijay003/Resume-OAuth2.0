import { createSlice } from "@reduxjs/toolkit";



const addAllData=createSlice({
    name:'addAllData',
    initialState:{
       

    },
    reducers:{
       
        addPersonalData:(state,action)=>{
            const personaldata=action?.payload
            
           
            return {...state,personaldata}

        },
        addDecalartionData:(state,action)=>{
            const decalartionData=action?.payload

            return {...state,decalartionData}

        },
        addEducationalData:(state,action)=>{
            const educationaldata=action?.payload
          
            const items=Object.values(state)
            for(let i of items){
              
                if(i?.payload?.university === educationaldata?.payload?.university){
                  
                  alert('duplicate data')
                    return state
                }

            }

           return {...state,[`educationDetail${action.payload.index}`]:educationaldata}

        },
        addWorkExperienceData:(state,action)=>{
            const workExperineceData=action?.payload
          
           
            const items=Object.values(state)
            for(let i of items){
               
                if(i?.payload?.company === workExperineceData?.payload?.company){
                    alert("duplicate data")
                    return state
                }

            }
            return {...state,[`workexperience${action.payload.index}`]:workExperineceData}

        },
        removeWorkExperienceData:(state,action)=>{
            const keyTobeRemoved=action?.payload
            for(let key in state){
              
                const numbersOnly = key?.match(/\d+/g);
              
                if(numbersOnly!==null && numbersOnly===keyTobeRemoved){
                   
                    delete state[key]
                }
            }
            return state

        },
        removeEducationalData:(state,action)=>{
            const keyTobeRemoved=action?.payload
          
            
                for(let key in state){
                    const numbersOnly = key?.match(/\d+/g)

                    if(numbersOnly!==null && numbersOnly===keyTobeRemoved){
                     
                        delete state[key]
                    }
                }

            return state

        }
    }
})

export const {addEducationalData,
    addPersonalData,addWorkExperienceData,
    removeEducationalData,removeWorkExperienceData,
    addDecalartionData}=addAllData.actions

export default addAllData