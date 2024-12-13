import React, { useState } from "react";
import Navbar from "./Navbar";
import InputBox from "./InputBox";

function UpdateData() {
  const [username, setUsername] = useState("");
  console.log(username);
  return (
    <>
      <Navbar />
      <div className="login_page">
        <form className="login_wrapper">
          {/* {apiRes === 200 && (
            <p className="successPop">User Group added successfully!!</p>
          )} */}
          <InputBox
            title="Username"
            id={"username"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            /* onChange={(e) => {
              setUserGroupArr((p) => ({ ...p, usergroup: e.target.value }));
              console.log(e.target.value);
            }} */
          />
          <button>Add</button>
        </form>
      </div>
    </>
  );
}

export default UpdateData;
