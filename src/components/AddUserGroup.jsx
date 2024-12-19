import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import Navbar from "./Navbar";
import axios from "axios";
// import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AxiosInstances from "../AxiosInstances";

function AddUserGroup({ role }) {
  const [usergroup, setUserGroupArr] = useState({ usergroup: "" });
  const [message, setMessage] = useState({ message: "", type: "" });

  let navigate = useNavigate();

  useEffect(() => {
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    if (!permissions.includes("can_add")) {
      navigate("/");
    }
    /*  let usergroup = localStorage.getItem("usergroup");
    if (!role.includes(usergroup)) {
      navigate("/");
    } */
  }, []);

  function addUserGroup(e) {
    e.preventDefault();
    /* console.log(
      isTokenExpired(JSON.parse(localStorage.getItem("token")).access_token),
      "token EXPIRY CHECK"
    ); */
    AxiosInstances.post("/usergroups", usergroup)
      .then((res) => {
        // setApiRes(res.status);
        setMessage({
          message: "Usergroup Successfully Added!",
          type: "successPop",
        });
      })
      .catch((err) => {
        console.log(err);
        setMessage({
          message: "Failed to Add Usergroup!",
          type: "errorPop",
        });
      });
    setUserGroupArr((p) => ({ ...p, usergroup: "" }));
  }

  return (
    <>
      <div className="login_page">
        {message?.message !== "" && (
          <p className={message.type}>{message.message}</p>
        )}
        <form onSubmit={addUserGroup} className="login_wrapper">
          {/*  {apiRes === 200 && (
            <p className="successPop">User Group added successfully!!</p>
          )} */}
          <InputBox
            title="User Group"
            id={"usergroup"}
            value={usergroup.usergroup}
            placeholder={"Enter Usergroup Name"}
            onChange={(e) => {
              setUserGroupArr((p) => ({ ...p, usergroup: e.target.value }));
              console.log(e.target.value);
            }}
          />
          <button>Add</button>
        </form>
      </div>
    </>
  );
}

export default AddUserGroup;
