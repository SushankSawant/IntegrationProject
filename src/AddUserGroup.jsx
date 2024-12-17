import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddUserGroup({ role }) {
  const [usergroup, setUserGroupArr] = useState({ usergroup: "" });
  const [apiRes, setApiRes] = useState(null);
  /*  const { isTokenExpired } = useAuth(); */

  let navigate = useNavigate();

  useEffect(() => {
    let usergroup = localStorage.getItem("usergroup");
    if (!role.includes(usergroup)) {
      navigate("/");
    }
  }, []);

  function addUserGroup(e) {
    e.preventDefault();
    /* console.log(
      isTokenExpired(JSON.parse(localStorage.getItem("token")).access_token),
      "token EXPIRY CHECK"
    ); */
    axios
      .post("http://192.168.1.42:8000/api/v1/testapp/usergroups", usergroup)
      .then((res) => {
        setApiRes(res.status);
      })
      .catch((err) => console.log(err));
    setUserGroupArr((p) => ({ ...p, usergroup: "" }));
  }

  return (
    <div className="login_page">
      <form onSubmit={addUserGroup} className="login_wrapper">
        {apiRes === 200 && (
          <p className="successPop">User Group added successfully!!</p>
        )}
        <InputBox
          title="User Group"
          id={"usergroup"}
          value={usergroup.usergroup}
          onChange={(e) => {
            setUserGroupArr((p) => ({ ...p, usergroup: e.target.value }));
            console.log(e.target.value);
          }}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddUserGroup;
