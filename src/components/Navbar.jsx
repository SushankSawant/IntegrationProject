import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useThemeContext } from "../Context/ThemeContext";
// import AxiosInstances from "./AxiosInstances";
import moon from "../images/moon.png";
import sun from "../images/sun.png";

function Navbar() {
  const navigate = useNavigate();
  const { logoutAuth } = useAuth();
  const { theme, toggleTheme } = useThemeContext();
  let permissions = localStorage.getItem("permissions");

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
        {/* <li
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </li> */}
        {(permissions.includes("can_view") ||
          permissions.includes("can_add")) && (
          <li
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </li>
        )}

        {/*   <li
          onClick={() => {
            navigate("/adduser");
          }}
        >
          Add User
        </li> */}
        <li
          onClick={() => {
            navigate("/feed");
          }}
        >
          Feed
        </li>
        {/* <li
          onClick={() => {
            navigate("/changepassword");
          }}
        >
          Change Password
        </li> */}

        {/*  {localStorage.getItem("usergroup") === "superadmin" && (
          <li
            onClick={() => {
              navigate("/addusergroup");
            }}
          >
            Add Usergroup
          </li>
        )} */}
        {/* {localStorage.getItem("usergroup") === "superadmin" && (
          <li
            onClick={() => {
              navigate("/updatedata");
            }}
          >
            Update Profile
          </li>
        )} */}
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
                localStorage.removeItem("permissions");
                navigate("/login");
              });
          }}
        >
          Logout
        </li>
        <div className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? (
            <img src={sun} alt="" />
          ) : (
            <img src={moon} alt="" />
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
