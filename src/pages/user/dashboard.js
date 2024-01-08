import React from "react";
import { BrowserRouter,Routes,Route,Link,useNavigate } from 'react-router-dom';


const Dashboard=()=>{
    const navigate = useNavigate();

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    window.location.reload()
    // Redirect to the login page
    navigate('/');
    
  };

    return (
<>
<ul>
        <li>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
<h1>Dashboard</h1>
</>
    )
    
}

export default Dashboard