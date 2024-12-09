import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
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
              .catch((err) => console.log(err));
            // localStorage.setItem("login", false);
            localStorage.removeItem("token");
            localStorage.setItem("login", false);
            navigate("/login");
          }}
        >
          Logout
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
            navigate("/");
          }}
        >
          Home
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
