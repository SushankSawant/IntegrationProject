import React from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import Navbar from "./Navbar";
import "./Navbar.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="AAAAA">
        <h1 style={{ color: "black" }}>WELCOME HOME</h1>
      </div>
      {/* <ChangePassword /> */}
      {/* <button
        onClick={() => {
          localStorage.setItem("login", false);
          navigate("/login");
        }}
      >
        LOGOUT
      </button> */}
    </div>
  );
}

export default Home;
