import { createSlice } from "@reduxjs/toolkit";
import { postJsonData,getData } from "./apiThunk";


const apiSlice=createSlice({
    name:"api",
    initialState:{
        data:[],
        isLoading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
     //Post data
     builder.addCase(postJsonData.pending,(state)=>{
        state.isLoading=true
        state.error=null
     })
     builder.addCase(postJsonData.fulfilled,(state,action)=>{
        state.isLoading=false
        state.data=action.payload
        console.log("action",action.payload)
     })
     builder.addCase(postJsonData.rejected,(state,action)=>{
        state.isLoading=false
        state.error=action.error.message

     })

     //Get data
     builder.addCase(getData.pending,(state)=>{
      state.isLoading=true
      state.error=null
     })
     builder.addCase(getData.fulfilled,(state,action)=>{
        state.isLoading=false
        state.data=action.payload
     })
     builder.addCase(getData.rejected,(state,action)=>{
        state.isLoading=false
        state.error=action.error.message
     })
    }
})


export default apiSlice.reducer

