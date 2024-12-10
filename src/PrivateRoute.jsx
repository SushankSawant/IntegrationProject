import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { useEffect } from "react";
const PrivateRoute = () => {
  // let loginStatus = localStorage.getItem("login");
  const { loginStatus } = useAuth();

  // console.log(loginStatus, "IN PRIVATE ROUTE");

  return loginStatus === true ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
