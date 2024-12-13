import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
// import AxiosInstances from "./AxiosInstances";

function Navbar() {
  const navigate = useNavigate();
  const { logoutAuth } = useAuth();

  return (
    <nav>
      <h1>CollabProject</h1>
      <ul>
        <li
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </li>
        <li
          onClick={() => {
            navigate("/changepassword");
          }}
        >
          Change Password
        </li>

        <li
          onClick={() => {
            navigate("/addusergroup");
          }}
        >
          Add Usergroup
        </li>
        <li
          onClick={() => {
            navigate("/updatedata");
          }}
        >
          Update Data
        </li>
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
