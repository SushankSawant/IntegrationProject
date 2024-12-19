import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AxiosInstances from "../AxiosInstances";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
// import Dropdown from "./DropDown";

function Permissions({ role }) {
  const [usergroup, setUserGroup] = useState("");
  const [apiRes, setApiRes] = useState(null);
  const [permissionArr, setPermissionArr] = useState([]);
  const navigate = useNavigate();
  useEffect(
    () => {
      // setUserGroup(localStorage.getItem)
      let usergroup1 = localStorage.getItem("usergroup");
      if (!role.includes(usergroup1)) {
        navigate("/");
      }
      AxiosInstances.get("/list_permissions").then((res) => {
        console.log(res);
        setApiRes(res.data.data);
      });
      /*  if (usergroup) {
      setPermissionArr(
        apiRes[apiRes?.findIndex((e) => e["usergroup"] == usergroup)][
          "permissions"
        ]
      );
    } */
    },
    [
      /* usergroup */
    ]
  );

  console.log({ usergroup: usergroup, permission: permissionArr });

  return (
    <>
      <div className="permission_wrapper">
        <h1>Permissions</h1>
        {/* <div className="dropdownHolder">
          <Dropdown
            selectedData={usergroup}
            dropTitle={"User Group"}
            onchange={(e) => {
              setUserGroup(e);
            }}
            reqArr={apiRes}
          />
        </div> */}
        <div className="permissionHandler">
          <div className="permissionBox">
            <h1>Select Usergroup</h1>

            <div className="permissionList">
              <ul>
                {apiRes?.map((e, i) => {
                  return (
                    <li
                      className={usergroup == e["usergroup"] ? "selected" : ""}
                      onClick={() => {
                        let selected = e["usergroup"];
                        setUserGroup(selected);
                        setPermissionArr(
                          apiRes[
                            apiRes?.findIndex((e) => e["usergroup"] == selected)
                          ]["permissions"]
                        );
                        /*  if (usergroup == e) {
                          setUserGroup("");
                          setPermissionArr([]);
                        } else {
                          setUserGroup(e["usergroup"]);
                        } */
                      }}
                    >
                      {e["usergroup"]}
                    </li>
                  );
                })}
              </ul>
            </div>
            {/*   <button
              onClick={() => {
                console.log(permissionArr);
              }}
            >
              Update
            </button> */}
          </div>
          <div className="permissionBox">
            <h1>Permission List</h1>

            <div className="permissionList">
              <ul>
                {["can_add", "can_view", "can_update", "can_delete"].map(
                  (e, i) => {
                    return (
                      <li
                        className={permissionArr.includes(e) ? "selected" : ""}
                        onClick={() => {
                          if (!permissionArr.includes(e)) {
                            setPermissionArr((p) => [...p, e]);
                          } else {
                            let ogArr = permissionArr;
                            ogArr.splice(permissionArr.indexOf(e), 1);
                            setPermissionArr([...ogArr]);
                          }
                        }}
                      >
                        {e}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
            <button
              onClick={() => {
                // console.log(permissionArr);
                AxiosInstances.post("/permissions", {
                  usergroup: usergroup,
                  permissions: permissionArr,
                })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
                /* AxiosInstances.get("/list_permissions").then((res) => {
                  console.log(res);
                  setApiRes(res.data.data);
                }); */
                setUserGroup("");
                setPermissionArr([]);
              }}
            >
              Update
            </button>
          </div>
          {/*     <div className="permissionBox">
            <h1>Granted Permissions</h1>
            <div className="permissionList">
              <ul>
                {["Create", "View", "Update", "Delete"].map((e, i) => {
                  return (
                    <li
                    
                    >
                      {e}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Permissions;
