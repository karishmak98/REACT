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

import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate=useNavigate()
  const [validated, setValidated] = useState(false);
  const [data,setData]=useState({
    name:'',
email:'',
password:'',
captcha:''
  })
 
  

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
        confirmButtonText: "Register"
      }).then((result) => {
        if (result.isConfirmed) {
          AuthService.Register('registerUser', data)
            .then((response) => {
              console.log("response", response);
              if (response.apiResponseCode === "1001") {
                Swal.fire({
                  title: "Registered!",
                  text: response.apiResponseMessage,
                  icon: "success"
                }).then(() => {
                  // Redirect to the login page after successful registration
                  navigate('/'); // Using useNavigate instead of history.push
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: response.apiResponseMessage
                });
              }
            })
            .catch((error) => {
              console.log("Error:", error);
              // Handle API call error, show an appropriate message
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Registration failed. Please try again later."
              });
            });
        }
      });
    }
    setValidated(true);
  };
  



  return (
    <>
    <div className="form_container">
      <h3 className="mt-3">Sign Up</h3>
      <CForm
        className="row g-3 needs-validation mt-5"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        autoComplete='off'
        
      >
        <CCol md={12} xs={12}>
          <CFormLabel htmlFor="name">Name</CFormLabel>
          <CFormInput
            type="text"
            id="name"
            name="name"
            placeholder="Enter name..."
            onChange={handleChange}
            required
          />
          <CFormFeedback invalid>Please enter a valid user name</CFormFeedback>
        </CCol>
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
        <CCol xs={12}>
          <CButton className="primary button_primary" type="submit">
            Sign up
          </CButton>
        </CCol>
      </CForm>
      </div>
    </>
  );
};

export default Register;
