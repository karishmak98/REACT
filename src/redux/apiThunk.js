import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


let URL=process.env.REACT_APP_API_URL

console.log("URL",URL)


let token=sessionStorage.getItem('token')

const authHeader=(requiredToken)=>{
 const config={
    'Content-Type':'application/json'
 }
 if (requiredToken && token){
    config.Authorization=token
 }
}

export const postJsonData=createAsyncThunk('api/postJsonData',async({reqUrl,jsonData,requireToken})=>{
try{

const response= axios.post(URL + reqUrl,jsonData,{headers:authHeader(requireToken)})
 console.log("reposnssse",response)
return response
}catch(error){
 console.log("error",error)
 throw error
}
})


export const getData=createAsyncThunk('api/getData',async({reqUrl,requireToken=true})=>{
  try{
    const response=axios.get(URL+reqUrl,{headers:authHeader(requireToken)})
  }catch(error){
    throw error
  }
})


