import { createSlice } from "@reduxjs/toolkit";


const allComponentsSlice=createSlice({
    name:'addComponents',
    initialState:{
        educationalComponent:{
            totalCount:1,
            id:''
        },
        workExperienceComponent:{
            totalCount:1,
            id:''
        }
       
    },
    reducers:{
        addEducationalComponent:(state,action)=>{
            if(state.educationalComponent.totalCount===4){
                return
            }
           
            return {...state,educationalComponent:{totalCount:state.educationalComponent.totalCount+1,id:action.payload.id}}

        },
        addWorkExperienceComponent:(state,action)=>{
            if(state.workExperienceComponent.totalCount===4){
                return

            }
           
            return {...state,workExperienceComponent:{totalCount:state.workExperienceComponent.totalCount+1,id:action.payload.id}}

        },
      
        removeEducationalComponent:(state,action)=>{
            if(state.educationalComponent.totalCount===1){
                return
            }
           
            return {...state,educationalComponent:{totalCount:state.educationalComponent.totalCount-1,id:action.payload.id}}

        },
      
        removeWorkExperienceComponent:(state,action)=>{
            if(state.workExperienceComponent.totalCount===1){
                return
            }

            return {...state,workExperienceComponent:{totalCount:state.workExperienceComponent.totalCount-1,id:action.payload.id}}

        }
    }
})


export const {
   
    addEducationalComponent,
    addWorkExperienceComponent,
  
    removeEducationalComponent,
    removeWorkExperienceComponent
}=allComponentsSlice.actions


export default allComponentsSlice