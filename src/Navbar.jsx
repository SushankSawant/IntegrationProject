import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
// import AxiosInstances from "./AxiosInstances";

function Navbar() {
  const navigate = useNavigate();
  const { logoutAuth } = useAuth();

  useEffect(() => {
    console.log("MOUNTED NAV");
  }, []);

  return (
    <nav>
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        Collab-Project
      </h1>
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
            navigate("/adduser");
          }}
        >
          Add User
        </li>
        <li
          onClick={() => {
            navigate("/feed");
          }}
        >
          Feed
        </li>
        <li
          onClick={() => {
            navigate("/changepassword");
          }}
        >
          Change Password
        </li>

        {localStorage.getItem("usergroup") === "superadmin" && (
          <li
            onClick={() => {
              navigate("/addusergroup");
            }}
          >
            Add Usergroup
          </li>
        )}
        {localStorage.getItem("usergroup") === "superadmin" && (
          <li
            onClick={() => {
              navigate("/updatedata");
            }}
          >
            Update Data
          </li>
        )}
        {localStorage.getItem("usergroup") === "superadmin" && (
          <li
            onClick={() => {
              navigate("/permissions");
            }}
          >
            Permissions
          </li>
        )}
        <li
          onClick={() => {
            let refresh_token =
              /* JSON.parse */ localStorage.getItem("refresh_token");
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
                localStorage.removeItem("usergroup");
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
