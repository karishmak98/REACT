import React, { useState } from "react";
import {
    CForm,
    CFormLabel,
    CFormInput,
    CFormText,
    CFormCheck,
    CButton,
    CCol,
    CFormFeedback,
  } from "@coreui/react";
  import AuthService from '../../components/services/authService'
  import Swal from 'sweetalert2'
  import ClientCaptcha from "react-client-captcha";
  import { useNavigate,Navigate } from 'react-router-dom';
  import {useDispatch,useSelector} from 'react-redux'
  import { postJsonData } from "../../redux/apiThunk";

const Login=()=>{
    const navigate=useNavigate()
    const [validated, setValidated] = useState(false);
    const [data,setData]=useState({
  email:'',
  password:'',
  captcha:''
    })
   
    const [captchaCode, setCaptcha] = useState();
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const dispatch=useDispatch()
  
    const handleChange=(e)=>{
     const name=e.target.name
     const value=e.target.value
     setData({...data,[name]:value})
    
     
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login"
        }).then((result) => {
          if (result.isConfirmed) {
            try{
              dispatch(postJsonData({ reqUrl: 'login', jsonData: data, requireToken: false })).then((response)=>{
              if (response.payload.data.apiResponseCode==="1001"){
      Swal.fire({
                    title: "Success",
                    text: response.apiResponseMessage,
                    icon: "success"
                  }).then(() => {
                    sessionStorage.setItem('token', response.payload.data.accessToken); // Set token in sessionStorage
                    navigate('/dashboard', { replace: true });
                    setIsLoggedIn(true)
                  window.location.reload()
                 
                  });
              }else{
       Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.apiResponseMessage
                  });
              }
              }).catch((error)=>{
             console.log("errrorr")
              })
            }catch(error){
                throw error
            }
           
            // AuthService.Login('login', data)
            //   .then((response) => {
            //     if (response.apiResponseCode === "1001") {
            //       Swal.fire({
            //         title: "Success",
            //         text: response.apiResponseMessage,
            //         icon: "success"
            //       }).then(() => {
            //         sessionStorage.setItem('token', response.accessToken); // Set token in sessionStorage
            //         navigate('/dashboard', { replace: true });
            //         setIsLoggedIn(true)
            //       window.location.reload()
                 
            //       });
            //     } else {
            //       Swal.fire({
            //         icon: "error",
            //         title: "Oops...",
            //         text: response.apiResponseMessage
            //       });
            //     }
            //   })
            //   .catch((error) => {
            //     console.log("Error:", error);
            //     // Handle API call error, show an appropriate message
            //     Swal.fire({
            //       icon: "error",
            //       title: "Oops...",
            //       text: "Registration failed. Please try again later."
            //     });
            //   });
          }
        });
      }
      setValidated(true);
    };
    
    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }
  

    return (
    <>
<div className="form_container">
      <h3 className="mt-3">Login</h3>
      <CForm
        className="row g-3 needs-validation mt-5"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        autoComplete='off'
        
      >
        <CCol md={12} xs={12}>
          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput
            type="text"
            id="email"
            name="email"
            placeholder="Enter email..."
            onChange={handleChange}
            required
          />
          <CFormFeedback invalid>Please enter a valid email</CFormFeedback>
        </CCol>
        <CCol md={12} xs={12}>
          <CFormLabel htmlFor="password">Password</CFormLabel>
          <CFormInput name="password" type="password" id="password" required  placeholder="Enter password" onChange={handleChange} />
          {/* <CFormFeedback invalid>Please enter a valid password</CFormFeedback> */}

          <CFormFeedback invalid>Please enter a valid password</CFormFeedback>
        </CCol>
        <CCol md={12} xs={12}>
        <ClientCaptcha
              captchaCode={setCaptcha}
              chars="ABCDEFGHJK@"
              charsCount={6}
              width={150}
              height={50}
              fontSize={20}
              backgroundColor="#F5F5DC"
              fontColor="blue"
            />
             <CFormInput
             className="mt-3"
              type="text"
              name="captcha"
              placeholder="Enter captcha..."
              onChange={handleChange}
              pattern={captchaCode}
              required
              
            />
            <CFormFeedback invalid>Please enter a valid captcha</CFormFeedback>
        </CCol>
        <CCol xs={12}>
          <CButton className="primary button_primary" type="submit">
            Login
          </CButton>
        </CCol>
      </CForm>
      </div>
    
    
    </>
    )
}

export default Login