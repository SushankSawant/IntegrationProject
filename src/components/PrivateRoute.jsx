import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
const PrivateRoute = ({ role }) => {
  let loginStatus = localStorage.getItem("access_token");

  return loginStatus ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
