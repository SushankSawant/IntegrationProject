import React, { useState } from "react";
// import "./styling/RegisterPage.css";
import InputBox from "./InputBox";

function ChangePassword() {
  const [detail, setDetail] = useState({
    username: "",
    oldpassword: "",
    newpassword: "",
  });

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
      password: e.target.value.trim().slice(0, 18),
    }));
  }

  return (
    <div className="register_page">
      <div className="validationForm">
        <InputBox
          id={"username"}
          title={"User Name"}
          value={detail.username}
          onChange={(e) =>
            setDetail((p) => ({ ...p, username: e.target.value }))
          }
        />
        {
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
              title={"Password"}
              id={"password"}
              type={"password"}
              value={detail.password}
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
        }
        <InputBox
          id={"newpassword"}
          title={"New Password"}
          type={"password"}
          value={detail.newpassword}
          onChange={(e) =>
            setDetail((p) => ({ ...p, newpassword: e.target.value }))
          }
        />
        <button>Change Password</button>
      </div>
    </div>
  );
}

export default ChangePassword;
