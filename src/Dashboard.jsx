import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  let usergroup = localStorage.getItem("usergroup");
  const navigate = useNavigate();

  return (
    <div className="homeWrapper">
      <div className="boxHolder">
        <h1>View</h1>
        <div className="box">
          <p
            onClick={() => {
              navigate("userlist");
            }}
          >
            Users
          </p>
          {usergroup == "superadmin" && (
            <p
              onClick={() => {
                navigate("usergroups");
              }}
            >
              User Groups
            </p>
          )}
        </div>
        <h1>Action</h1>
        <div className="box">
          <p
            onClick={() => {
              navigate("adduser");
            }}
          >
            Add Users
          </p>
          {usergroup == "superadmin" && (
            <p
              onClick={() => {
                navigate("addusergroup");
              }}
            >
              Add Usergroup
            </p>
          )}
          {usergroup == "superadmin" && (
            <p
              onClick={() => {
                navigate("updatedata");
              }}
            >
              Update Profile
            </p>
          )}
          {usergroup == "superadmin" && (
            <p
              onClick={() => {
                navigate("changepassword");
              }}
            >
              Change Password
            </p>
          )}
        </div>
      </div>
      <div className="display">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
