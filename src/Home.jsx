import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import Navbar from "./Navbar";
import "./Navbar.css";
import { useAuth } from "./Context/AuthContext";
import axios from "axios";
import Pagination from "./Pagination";
import addUserGroup from "./AddUserGroup";
import UserTable from "./UserTable";
import UserGroup from "./UserGroup";
// import { use } from "react";

function Home() {
  // const navigate = useNavigate();
  let usergroup = localStorage.getItem("usergroup");

  // const [toShow, setToShow] = useState("");
  /*  const toShowObj = {
    userTable: <UserTable />,
    userGroup: <UserGroup />,
  }; */
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("username"));
  }, []);
  // const { loginStatus } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      {
        <div className="homeWrapper">
          {usergroup === "superadmin" || usergroup === "admin" ? (
            <>
              <div className="box">
                <p
                  onClick={() => {
                    navigate("/userlist");
                  }}
                >
                  Users
                </p>
                {usergroup == "superadmin" && (
                  <p
                    onClick={() => {
                      navigate("/usergroups");
                    }}
                  >
                    User Groups
                  </p>
                )}
              </div>
              <div className="display">
                <Outlet />
              </div>
            </>
          ) : (
            <>
              <h1>Welcome Home {user} 🤩</h1>
            </>
          )}
        </div>
      }
    </div>
  );
}

export default Home;
