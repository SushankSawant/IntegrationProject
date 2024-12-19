import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
// import Dropdown from "./DropDown";
import AxiosInstances from "../AxiosInstances";
import Navbar from "./Navbar";
import Dropdown from "./Dropdown";
import axios from "axios";

function AddUser({ role }) {
  const [userGroupArr, setUserGroupArr] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState({ message: "", type: "" });
  let permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    if (!permissions.includes("can_add")) {
      navigate("/");
    }
    /*   let usergroup = localStorage.getItem("usergroup");
    if (!role.includes(usergroup)) {
      navigate("/");
    } */

    AxiosInstances.get(
      localStorage.getItem("usergroup") == "superadmin"
        ? "/list_usergroups"
        : "/list_usergroups_member"
    ).then((res) => {
      console.log(res);
      setUserGroupArr(res.data.data);
    });
  }, []);

  const [detail, setDetail] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone_number: "",
    usergroup: "",
    password: "",
    datetime: "",
  });

  const [apiRes, setApiRes] = useState();

  const [passValid, setPassValid] = useState({
    show: false,
    upper: false,
    number: false,
    special: false,
    length: false,
  });

  const [confirmPass, setConfirmPass] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();
    let errorFound = checkValidation(detail, required);
    console.log(errorFound);
    if (detail.password === confirmPass && errorFound.length === 0) {
      axios
        .post("http://192.168.1.42:8000/api/v1/testapp/register", detail)
        .then((res) => {
          console.log(res);
          setMessage({
            message: "User Registeration Successfull!",
            type: "successPop",
          });
          setDetail({
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            phone_number: "",
            usergroup: "",
            password: "",
            datetime: "",
          });
          setConfirmPass("");
        })
        .catch((err) => {
          setApiRes(err);
          setMessage({
            message: "User Registeration Failed !",
            type: "errorPop",
          });
        });
      // alert("Successfully Submited !");
      console.log(detail);
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

  let required = [
    "firstname",
    "lastname",
    "username",
    "phone_number",
    "email",
    "password",
  ];

  let submit;
  console.log(submit, "submit");

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
  console.log(detail);
  console.log(apiRes);
  return (
    <>
      <div className="register_page">
        {message?.message !== "" && (
          <p className={message.type}>{message.message}</p>
        )}
        {/*   <a
          href="/login"
          style={{
            position: "fixed",
            top: "10px",
            left: "10px",
            fontSize: "20px",
            textDecoration: "none",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Login
        </a> */}
        {/* <h1>131</h1> */}
        <form className="validationForm" onSubmit={handleSubmit}>
          <h1 className="form_title">Add User</h1>
          <InputBox
            id={"firstname"}
            title={"First Name"}
            value={detail.firstname}
            placeholder={"Enter Firstname"}
            onChange={(e) =>
              setDetail((p) => ({ ...p, firstname: e.target.value }))
            }
          />
          <InputBox
            id={"lastname"}
            title={"Last Name"}
            value={detail.lastname}
            placeholder={"Enter Lastname"}
            onChange={(e) =>
              setDetail((p) => ({ ...p, lastname: e.target.value }))
            }
          />
          <InputBox
            title={"Username"}
            id={"username"}
            value={detail.username}
            placeholder={"Enter Username"}
            onChange={(e) =>
              setDetail((p) => ({
                ...p,
                username: e.target.value.trim().toLowerCase(),
              }))
            }
          />

          <InputBox
            title={"Phone"}
            id={"phone_number"}
            value={detail.phone_number}
            placeholder={"Enter Phone"}
            onChange={(e) => {
              setDetail((prev) => ({
                ...prev,
                phone_number: e.target.value.slice(0, 10),
              }));
            }}
            onKeyDown={(event) => {
              if (isNaN(event.key) && event.key !== "Backspace") {
                event.preventDefault();
              }
            }}
          />
          <InputBox
            title={"Email"}
            id={"email"}
            value={detail.email}
            placeholder={"Enter Email Address"}
            onBlur={() => {
              if (
                !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
                  detail.email
                )
              ) {
                document.getElementById("email").classList.add("error");
                // submit = false;
              } else {
                // submit = true;
              }
            }}
            onChange={(e) => {
              setDetail((p) => ({ ...p, email: e.target.value.toLowerCase() }));
              // submit = true;
            }}
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
              title={"Password"}
              id={"password"}
              type={"password"}
              value={detail.password}
              placeholder={"Enter Password"}
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
          <InputBox
            title={"Confirm Password"}
            type="password"
            // autoComplete={"new-password"}
            className={detail.password !== confirmPass ? "error" : ""}
            id={"confirmPassword"}
            value={confirmPass}
            placeholder={"Re-enter Password"}
            onChange={(e) => {
              setConfirmPass(e.target.value.trim());
            }}
          />
          <div className="inputHolder">
            <label htmlFor="">Select Time</label>
            <input
              type="datetime-local"
              name=""
              id=""
              className="time_selector"
              value={detail.datetime}
              onChange={(e) => {
                setDetail((p) => ({ ...p, datetime: e.target.value }));
              }}
            />
          </div>
          <Dropdown
            selectedData={detail.usergroup}
            dropTitle={"User Group"}
            onchange={(e) => {
              setDetail((p) => ({
                ...p,
                usergroup: e,
              }));
            }}
            reqArr={userGroupArr}
          />

          <button>Submit</button>
          {/*  <a
            href="/login"
            style={{
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Already have an account ?
          </a>
          {apiRes?.status === 409 && (
            <p className="errorPop">USER ALREADY EXISTS !!</p>
          )} */}
        </form>
      </div>
    </>
  );
}

export default AddUser;