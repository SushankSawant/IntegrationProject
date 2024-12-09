import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { useEffect } from "react";
const PrivateRoute = () => {
  let loginStatus = localStorage.getItem("login");

  return loginStatus === "true" ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
