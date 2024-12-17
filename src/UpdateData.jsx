import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";
import Dropdown from "./DropDown";
import AxiosInstances from "./AxiosInstances";
import axios from "axios";

function UpdateData({ role }) {
  useEffect(() => {
    let usergroup = localStorage.getItem("usergroup");
    if (!role.includes(usergroup)) {
      navigate("/");
    }
  }, []);
  // const [curUsername, setCurUsername] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });
  const [userGroupArr, setUserGroupArr] = useState(null);
  const navigate = useNavigate();

  const [detail, setDetail] = useState({
    username: "",
    firstname: "",
    lastname: "",
    // phone_number: "",
    usergroup: "",
  });

  useEffect(() => {
    AxiosInstances.get("/list_usergroups").then((res) => {
      console.log(res);
      setUserGroupArr(res.data.data);
    });
  }, []);

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
    console.log("CLICKED");
    if (errorFound.length === 0) {
      AxiosInstances.put("/update_user", detail)
        .then((res) => {
          console.log(res);
          setMessage({
            message: "Data Successfully Updated!",
            type: "successPop",
          });
        })
        .catch((err) => {
          setApiRes(err);
          console.log(err);
          setMessage({
            message: "Detail Updating Failed !",
            type: "errorPop",
          });
        });
      console.log(detail);
      setDetail({
        username: "",
        firstname: "",
        lastname: "",
        phone_number: "",
        usergroup: "",
      });
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

  let required = ["firstname", "lastname", "phone_number", "username"];

  let submit;

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

  return (
    <>
      <Navbar />
      <div className="login_page">
        {
          <form className="validationForm" onSubmit={handleSubmit}>
            <h1 className="form_title">Update Details</h1>
            <InputBox
              title={"Username"}
              id={"username"}
              value={detail.username}
              onChange={(e) =>
                setDetail((p) => ({
                  ...p,
                  username: e.target.value.trim().toLowerCase(),
                }))
              }
            />
            <InputBox
              id={"firstname"}
              title={"First Name"}
              value={detail.firstname}
              onChange={(e) =>
                setDetail((p) => ({ ...p, firstname: e.target.value }))
              }
            />
            <InputBox
              id={"lastname"}
              title={"Last Name"}
              value={detail.lastname}
              onChange={(e) =>
                setDetail((p) => ({ ...p, lastname: e.target.value }))
              }
            />

            {
              <InputBox
                title={"Phone Number"}
                id={"phone_number"}
                value={detail.phone_number}
                onBlur={() => {}}
                onChange={(e) => {
                  setDetail((prev) => ({
                    ...prev,
                    phone_number: e.target.value.slice(0, 10),
                  }));
                  /* clearTimeout(timer);
                  timer = setTimeout(() => {
                    checkUnique(e.target.value);
                  }, 1000); */
                }}
                onKeyDown={(event) => {
                  if (isNaN(event.key) && event.key !== "Backspace") {
                    event.preventDefault();
                  }
                }}
              />
            }
            {
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
            }

            <button>Submit</button>
          </form>
        }
        {message?.message !== "" && (
          <p className={message.type}>{message.message}</p>
        )}
      </div>
    </>
  );
}

export default UpdateData;
