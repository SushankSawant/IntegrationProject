import React, { useState } from "react";
import InputBox from "./InputBox";
import Navbar from "./Navbar";
import axios from "axios";

function UserGroup() {
  const [usergroup, setUserGroupArr] = useState({ usergroup: "" });

  function addUserGroup(e) {
    e.preventDefault();
    axios
      .post("http://192.168.1.42:8000/api/v1/testapp/usergroups", usergroup)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setUserGroupArr((p) => ({ ...p, usergroup: "" }));
  }

  return (
    <div className="login_page">
      <Navbar />
      <form onSubmit={addUserGroup} className="login_wrapper">
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

export default UserGroup;
