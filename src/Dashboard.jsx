import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  let usergroup = localStorage.getItem("usergroup");
  const navigate = useNavigate();

  return (
    <div className="homeWrapper">
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
      <div className="display">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
