import React from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="AAAAA">
      <h1 style={{ color: "black" }}>WELCOME HOME</h1>
      <ChangePassword />
      <button
        onClick={() => {
          localStorage.setItem("login", false);
          navigate("/login");
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default Home;
