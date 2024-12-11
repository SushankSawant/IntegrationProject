import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

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
            let token = JSON.parse(localStorage.getItem("token"));
            console.log(token, "CONSOLED TOKEN");
            axios
              .post(
                "http://192.168.1.42:8000/api/v1/testapp/logout",
                {},
                {
                  headers: {
                    refresh: token.refresh_token,
                  },
                }
              )
              .then((res) => {
                console.log(res);
              })
              .catch((err) => console.log(err))
              .finally(() => {
                logoutAuth();
                localStorage.removeItem("token");
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
