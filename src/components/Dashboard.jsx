import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  // let usergroup = localStorage.getItem("usergroup");
  let permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    if (!permissions.includes("can_view") && !permissions.includes("can_add")) {
      navigate("/");
    }
  }, []);
  const navigate = useNavigate();

  return (
    <div className="homeWrapper">
      <div className="boxHolder">
        {permissions.includes("can_view") && (
          <div className="box">
            <h1>View</h1>
            <p
              onClick={() => {
                navigate("userlist");
              }}
            >
              Users
            </p>

            <p
              onClick={() => {
                navigate("usergroups");
              }}
            >
              User Groups
            </p>
          </div>
        )}
        <div className="box">
          <h1>Action</h1>
          {permissions.includes("can_add") && (
            <>
              <p
                onClick={() => {
                  navigate("adduser");
                }}
              >
                Add Users
              </p>
              <p
                onClick={() => {
                  navigate("addusergroup");
                }}
              >
                Add Usergroup
              </p>
            </>
          )}

          {permissions.includes("can_update") && (
            <p
              onClick={() => {
                navigate("updatedata");
              }}
            >
              Update Profile
            </p>
          )}
          {
            <p
              onClick={() => {
                navigate("changepassword");
              }}
            >
              Change Password
            </p>
          }
        </div>
      </div>
      <div className="display">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
