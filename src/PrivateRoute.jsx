import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
const PrivateRoute = () => {
  const { token } = useAuth();
  return token == true ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
