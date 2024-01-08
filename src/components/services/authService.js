import React from 'react'
import axios from 'axios'
import authHeader from './header'


let Url=process.env.REACT_APP_API_URL

const PostJsonData= async(apiUrl,jsonData)=>{
    return await axios.post(Url + apiUrl,jsonData,{headers:authHeader()})
    .then((response)=>{
       return response.data
    })
}


const Register= async(apiUrl,jsonData)=>{
    return await axios.post(Url + apiUrl,jsonData)
    .then((response)=>{
       return response.data
    })
}

// const myDta=async(url,jsonDta)=>{
//  try{
//   const response=await axios.post(url,json);
//   return response.data
//  } catch (error){
//     throw error
//  }
// }
  

const GetData=async(apiUrl)=>{
    return await axios.get(Url + apiUrl)
    .then((response)=>{
     return response.data
    })
}


const Login=async(apiUrl,jsonData)=>{
  return await axios.post(Url + apiUrl,jsonData)
  .then((response)=>{
      return response.data
  })
}


const authService={
    PostJsonData,
    GetData,
    Login,
    Register
}

export default authService
