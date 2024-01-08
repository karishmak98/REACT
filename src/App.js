import logo from './logo.svg';
import './App.css';
import Register from './pages/user/Register';
import { BrowserRouter as Router,Routes,Route,Link,Navigate} from 'react-router-dom';

import Login from './pages/user/Login';
import Dashboard from './pages/user/dashboard';
import React, { useState,useEffect, Suspense, useContext } from "react";
import {AuthContext} from "./authContext/authProvider"


import { beforeLoginroutes,afterLoginroutes } from './route';

function App() {
  const {isLoggedIn}=useContext(AuthContext)

  console.log("isLoggedIn",isLoggedIn)
  // const [user, setUser] = useState();

//   useEffect(() => {
//     const userToken = sessionStorage.getItem('token');
//     if (userToken) {
//       setUser(userToken);
//     } 
//   }, []);

//   let routes;
// if(user){
    
//     routes = (
//       <Routes>
//           <Route path='/dashboard' element={<Dashboard/>}/>
//           <Route path='*' element={<Navigate to ='/dashboard'/>}/>
//       </Routes>
//     )
//   }
//   else{
//       routes = (
//       <Routes>
//         <Route path='/' element={<Login/>}/>
//         <Route path='*' element={<Navigate to="/"/>}/>
//       </Routes>
//     )
//   }


  // console.log("userr",user)
  return (
    <Router>
      <Suspense fallback={<div>...Loading</div>}>
      <Routes>
       {/* {routes.map(({ path, component: Component ,protected:isProtected}, index) => (
          <Route
            key={index}
            path={path}
            element={
              (isLoggedIn && isProtected) || (!isLoggedIn && !isProtected) ? (
                <Component />
              ) : (
                // <Navigate to="/404" replace />
                <h1>sdsa</h1>
              )
            }
          />
        ))} */}
        {isLoggedIn? 
        afterLoginroutes.map(({path,component:Component},index)=>(
          <Route key={index} path={path} element={path==="*"?<Navigate to="/dashboard"/>: <Component/>}/>
        )):
        beforeLoginroutes.map(({path,component:Component},index)=>(
          <Route key={index} path={path} element={path==="*"?<Navigate to="/login"/>: <Component/>}/>
        ))
      }
        
        </Routes>  
        </Suspense>
    </Router>
  );
}

export default App;
