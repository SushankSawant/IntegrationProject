import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import "../styling/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios, { AxiosHeaders } from "axios";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({ message: "", type: "" });

  const navigate = useNavigate();
  const { loginAuth } = useAuth();
  // console.log(loginStatus, "AT LOGIN PAGE");
  let loginStatus;

  useEffect(() => {
    loginStatus = localStorage.getItem("access_token");
    if (loginStatus) {
      navigate("/");
    }
  }, []);

  const [apiLoginRes, setApiLoginRes] = useState(null);
  const [apiLoginErr, setApiLoginErr] = useState(null);
  function login(e) {
    e.preventDefault();
    console.log(loginData, "login data posted");
    if (loginData.username && loginData.password) {
      axios
        .post(
          "http://192.168.1.42:8000/api/v1/testapp/login",
          {},
          {
            headers: {
              username: loginData.username,
              password: loginData.password,
            },
          }
        )
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("usergroup", res.data.usergroup);
          localStorage.setItem(
            "permissions",
            JSON.stringify(res.data.permissions)
          );
          setApiLoginRes(res);
          loginAuth(res.data);
          setApiLoginErr(null);
          navigate("/");
        })
        .catch((err) => {
          setApiLoginErr(err.status);
          setMessage({
            message: "Login Failed !",
            type: "errorPop",
          });
        });
      console.log(apiLoginErr?.status);
    }
  }

  return (
    <div className="login_page">
      {message?.message !== "" && (
        <p className={message.type}>{message.message}</p>
      )}
      <form onSubmit={login} className="login_wrapper">
        {/*  {apiLoginErr == 401 && (
          <p className="errorPop">Invalid Username or Password!!</p>
        )} */}
        <h1 className="form_title">Login</h1>
        <InputBox
          title="User Name"
          id={"username"}
          placeHolder={"Enter Username"}
          value={loginData.username}
          autoFocus
          onChange={(e) => {
            setLoginData((p) => ({
              ...p,
              username: e.target.value.toLowerCase(),
            }));
          }}
          onFocus={() => {
            setApiLoginErr(null);
          }}
        />
        <InputBox
          title="Password"
          id={"password"}
          type={"password"}
          placeHolder={"Enter Password"}
          value={loginData.password}
          onChange={(e) => {
            setLoginData((p) => ({
              ...p,
              password: e.target.value.trim(),
            }));
          }}
          onFocus={() => {
            setApiLoginErr(null);
          }}
        />
        <button
        // onClick={(e) => {
        //   e.preventDefault();

        //   /* if (loginData.username && loginData.password === "sushank") {
        //     localStorage.setItem("login", true);
        //     navigate("/");
        //   } else {
        //     alert("wrong password");
        //   } */
        // }}
        >
          Login
        </button>
        <a href="/register">register</a>
      </form>
    </div>
  );
}

export default LoginPage;

{
  /* <svg
          width="100px"
          height="100px"
          viewBox="-0.5 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0001 13.09C14.4909 13.09 16.5101 11.0708 16.5101 8.58C16.5101 6.08919 14.4909 4.07 12.0001 4.07C9.5093 4.07 7.49011 6.08919 7.49011 8.58C7.49011 11.0708 9.5093 13.09 12.0001 13.09Z"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.98008 11.91C8.97008 11.91 8.97008 11.91 8.96008 11.92"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.9701 12.82C19.5601 14.4 21.3201 17.19 21.5001 20.4C21.5101 20.69 21.2801 20.93 20.9901 20.93H3.01007C2.72007 20.93 2.49007 20.69 2.50007 20.4C2.68007 17.21 4.43007 14.43 6.99007 12.85"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg> */
}