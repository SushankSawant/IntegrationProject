import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import ChangePassword from "./ChangePassword";
import UserGroup from "./UserGroup";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route element={<Home />} path="/" exact />
            <Route element={<UserGroup />} path="/usergroup" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
