import React from "react";
import { Navigate } from "react-router-dom";

export const Login = React.lazy(() => import("./pages/user/Login"));
export const Dashboard = React.lazy(() => import("./pages/user/dashboard"));
export const Register = React.lazy(() => import("./pages/user/Register"));

export const beforeLoginroutes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
  ,
  {
    path: "*"

  }
];



export const afterLoginroutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  }
  ,
  {
    path: "*"
  }
];