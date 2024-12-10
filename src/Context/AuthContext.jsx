import React, { Children, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  console.log(token, "IN AUTH CONTEXT");

  function loginAuth(token) {
    setLoginStatus(true);
    setToken(token);
    console.log(loginStatus, "IN LOGIN AUTH");
  }

  function logoutAuth() {
    setLoginStatus(false);
    setToken(null);
    console.log(loginStatus, "IN LOGOUT AUTH");
  }

  return (
    <AuthContext.Provider value={{ token, loginStatus, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
