import React, { useState } from "react";
// import "./styling/RegisterPage.css";
import InputBox from "./InputBox";
import Navbar from "./Navbar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function ChangePassword() {
  const [detail, setDetail] = useState({
    username: "",
    oldpassword: "",
    newpassword: "",
  });

  // const [apiRes, setApiRes] = useState(null);
  const [message, setMessage] = useState({ message: "", type: "" });

  const [passValid, setPassValid] = useState({
    show: false,
    upper: false,
    number: false,
    special: false,
    length: false,
  });

  function handlePasswordChange(e) {
    // const lower = new    ('(?=.*[a-z])')
    const upper = new RegExp("^(?=.*?[A-Z].*?[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,16})");

    setPassValid((prev) => ({
      ...prev,
      upper: upper.test(e.target.value),
      length: length.test(e.target.value),
      special: special.test(e.target.value),
      number: number.test(e.target.value),
    }));
    setDetail((prev) => ({
      ...prev,
      newpassword: e.target.value.trim().slice(0, 18),
    }));
  }

  let required = ["username", "oldpassword", "newpassword"];

  function checkValidation(obj, req) {
    let response = [];
    req
      .map((e) => {
        return e.split(".");
      })
      .forEach((e) => {
        let newObj = { ...obj };
        e.forEach((subEl) => {
          newObj = newObj[subEl];
        });
        if (!newObj || Object.keys(newObj).length === 0) {
          response.push(e.join("."));
        }
      });
    return response;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorFound = checkValidation(detail, required);
    console.log(errorFound);
    if (errorFound.length === 0) {
      axios
        .post(
          "http://192.168.1.42:8000/api/v1/testapp/change_password",
          {},
          { headers: detail }
        )
        .then((res) => {
          // setApiRes(res.status);
          console.log(res.status);
          setDetail({
            username: "",
            newpassword: "",
            oldpassword: "",
          });
          setMessage({
            message: "Password Successfully Changed!",
            type: "successPop",
          });
        })
        .catch((err) => {
          setMessage({
            message: "Password Change Failed!",
            type: "errorPop",
          });
          // setApiRes(err.status);
        });
      /* .finally(() => {
          setDetail({
            username: "",
            newpassword: "",
            oldpassword: "",
          });
        }); */
    } else {
      errorFound.forEach((details) => {
        console.log(details);
        if (
          details !== undefined &&
          !document
            .getElementById(`${details}`)
            ?.className?.includes("error") &&
          document.getElementById(`${details}`) &&
          detail !== null
        ) {
          document.getElementById(`${details}`)?.classList?.toggle("error");
        }
      });
      console.log(errorFound);
    }
  }

  return (
    <div className="login_page">
      <form className="validationForm" onSubmit={handleSubmit}>
        {/* {apiRes === 200 && (
            <p className="successPop">Password Changed Successfully!!</p>
          )}
          {apiRes === 401 && <p className="errorPop">Password Change Fail!!</p>} */}
        {message?.message !== "" && (
          <p className={message.type}>{message.message}</p>
        )}
        <InputBox
          id={"username"}
          title={"User Name"}
          value={detail.username}
          onChange={(e) => {
            setDetail((p) => ({ ...p, username: e.target.value }));
          }}
        />

        <InputBox
          id={"oldpassword"}
          title={"Current Password"}
          type={"password"}
          value={detail.oldpassword}
          onChange={(e) =>
            setDetail((p) => ({ ...p, oldpassword: e.target.value }))
          }
        />

        <div className="passwordWrap">
          {passValid?.show ? (
            <div
              className={
                passValid.show
                  ? "validateBoxShow"
                  : "hideValidate validateBoxShow"
              }
            >
              <ul>
                <li className={passValid.length ? "valid" : "invalid"}>
                  Minimum 8 charecters.
                </li>
                <li className={passValid.number ? "valid" : "invalid"}>
                  Minimum 1 Number
                </li>
                <li className={passValid.special ? "valid" : "invalid"}>
                  Minimum 1 Special charecter
                </li>
                <li className={passValid.upper ? "valid" : "invalid"}>
                  Minimum 2 Uppercase charecter
                </li>
              </ul>
            </div>
          ) : (
            <div className="hideValidate validateBoxShow"></div>
          )}
          <InputBox
            title={"New Password"}
            id={"password"}
            type={"password"}
            value={detail.newpassword}
            // className={errorFound.password ? "error" : ""}
            onChange={(e) => handlePasswordChange(e)}
            onFocus={() => {
              // console.log("object");
              setPassValid((prev) => ({
                ...prev,
                show: true,
              }));
            }}
            autoComplete={"new-password"}
            onBlur={() => {
              setPassValid((prev) => ({
                ...prev,
                show: false,
              }));
            }}
          />
        </div>
        <button>Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
