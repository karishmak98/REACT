import React, { createContext } from "react";
import { useEffect,useState } from "react";

export const AuthContext=createContext()

export const AuthProvider=({children})=>{
 const [isLoggedIn,setIsLoggedIn]=useState(false)

 useEffect(() => {
    const userToken = sessionStorage.getItem('token');
    if (userToken) {
        setIsLoggedIn(true);
    } 
  }, []);
 
  return (
    <AuthContext.Provider value={{isLoggedIn}}>
    {children}
    </AuthContext.Provider>
  )

}