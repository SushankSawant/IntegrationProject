import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import Navbar from "./Navbar";
import "./Navbar.css";
import { useAuth } from "./Context/AuthContext";
import axios from "axios";
import Pagination from "./Pagination";
import addUserGroup from "./AddUserGroup";
import UserTable from "./UserTable";
import UserGroup from "./UserGroup";
import { use } from "react";

function Home() {
  // const navigate = useNavigate();
  const [toShow, setToShow] = useState("");

  const toShowObj = {
    userTable: <UserTable />,
    userGroup: <UserGroup />,
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("username"));
  }, []);
  // const { loginStatus } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="homeWrapper">
        {user == "superadmin" ? (
          <>
            <div className="box">
              <p
                onClick={() => {
                  setToShow("userTable");
                  // console.log("CLICKED");
                }}
              >
                Users
              </p>
              <p
                onClick={() => {
                  setToShow("userGroup");
                }}
              >
                User Groups
              </p>
            </div>
            <div className="display">
              {toShow == "" ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1>Welcome Home {user} 🤩</h1>
                </div>
              ) : (
                toShowObj[toShow]
              )}
            </div>
          </>
        ) : (
          <>
            <h1>Welcome Home {user} 🤩</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
