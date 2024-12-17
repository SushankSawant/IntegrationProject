import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
// import AxiosInstances from "./AxiosInstances";

function Navbar() {
  // const [currPage, setCurPage] = useState("home");
  const navigate = useNavigate();
  const { logoutAuth } = useAuth();
  console.log(useLocation());
  let currPage = useLocation().pathname;
  console.log(currPage);

  return (
    <nav>
      <h1>CollabProject</h1>
      <ul>
        <li
          style={{ background: currPage == "/" && "#00acb57c" }}
          onClick={() => {
            navigate("/");
            // setCurPage("home");
          }}
        >
          Home
        </li>
        <li
          style={{ background: currPage == "/dashboard" && "#00acb57c" }}
          onClick={() => {
            navigate("/dashboard");
            // setCurPage("dashboard");
          }}
        >
          Dashboard
        </li>

        <li
          style={{ background: currPage == "/feed" && "#00acb57c" }}
          onClick={() => {
            navigate("/feed");
            // setCurPage("feed");
          }}
        >
          Feed
        </li>
        <li
          style={{ background: currPage == "/changepassword" && "#00acb57c" }}
          onClick={() => {
            navigate("/changepassword");
            // setCurPage("changepassword");
          }}
        >
          Change Password
        </li>

        {localStorage.getItem("usergroup") === "superadmin" && (
          <li
            style={{ background: currPage == "/addusergroup" && "#00acb57c" }}
            onClick={() => {
              navigate("/addusergroup");
              // setCurPage("addusergroup");
            }}
          >
            Add Usergroup
          </li>
        )}
        {localStorage.getItem("usergroup") == "/superadmin" && (
          <li
            onClick={() => {
              navigate("/updatedata");
            }}
          >
            Update Data
          </li>
        )}
        <li
          onClick={() => {
            let refresh_token =
              /* JSON.parse */ localStorage.getItem("refresh_token");
            // console.log(token, "CONSOLED TOKEN");
            axios
              .post(
                "http://192.168.1.42:8000/api/v1/testapp/logout",
                {},
                {
                  headers: {
                    refresh: refresh_token,
                  },
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err))
              .finally(() => {
                logoutAuth();
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("access_token");
                localStorage.removeItem("username");
                navigate("/login");
              });
          }}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
