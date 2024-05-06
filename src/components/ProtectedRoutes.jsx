import React from "react";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticate, isLogin, children }) => {
  // if (!isAuthenticate) {
  //   return <Navigate to={"/login"} />;
  // }
  // if (isLogin) {
    // alert("U r aleardy logged in")
    
    // return <Navigate to={"/"} />;
  // } else
   if (!isAuthenticate) {
    return <Navigate to={"/login"} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
