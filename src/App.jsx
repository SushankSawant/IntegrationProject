import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import ChangePassword from "./ChangePassword";

function App() {
  // const [count, setCount] = useState(0);
  // const {}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route element={<Home />} path="/" exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
