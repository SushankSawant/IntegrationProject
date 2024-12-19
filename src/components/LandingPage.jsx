import React from "react";

function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <h1>
        WELCOME {localStorage.getItem("username").toUpperCase()} (
        {localStorage.getItem("usergroup").toUpperCase()})
      </h1>
    </div>
  );
}

export default LandingPage;
