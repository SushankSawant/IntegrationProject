import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AxiosInstances from "../AxiosInstances";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
// import Dropdown from "./DropDown";

function Permissions({ role }) {
  const [usergroup, setUserGroup] = useState("");
  const [apiRes, setApiRes] = useState([
    { usergroup: "admin", permissions: ["can_add", "can_view"] },
    { usergroup: "member", permissions: ["can_add"] },
  ]);
  const [permissionArr, setPermissionArr] = useState([]);
  const [message, setMessage] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  // console.log(usergroup, permissionArr, apiRes);
  useEffect(
    () => {
      let localUsergroup = localStorage.getItem("usergroup");
      if (!role.includes(localUsergroup)) {
        navigate("/");
      } else {
        AxiosInstances.get("/list_permissions")
          .then((res) => {
            // console.log(res);
            setApiRes(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // setUserGroup("admin")
    },
    [
      /* usergroup */
    ]
  );

  // console.log({ usergroup: usergroup, permission: permissionArr });
  console.log(1212, apiRes);

  return (
    <>
      <div className="permission_wrapper">
        {message?.message !== "" && (
          <p className={message.type}>{message.message}</p>
        )}
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
                      key={`Ugperm_${i}`}
                      className={usergroup == e["usergroup"] ? "selected" : ""}
                      onClick={() => {
                        /*  if (
                          apiRes[
                            apiRes?.findIndex(
                              (apiResEle) =>
                                apiResEle["usergroup"] == e["usergroup"]
                            )
                          ]["permissions"].length == permissionArr.length &&
                          apiRes[
                            apiRes?.findIndex(
                              (apiResEle) =>
                                apiResEle["usergroup"] == e["usergroup"]
                            )
                          ]["permissions"].every((curele) => {
                            if (permissionArr.indexOf(curele) > -1) {
                              return (curele =
                                permissionArr[permissionArr.indexOf(curele)]);
                            }
                          })
                        ) { */
                        let selected = e["usergroup"];
                        setUserGroup((p) => {
                          if (
                            usergroup &&
                            JSON.stringify(
                              apiRes[
                                apiRes?.findIndex(
                                  (apiResEle) => apiResEle["usergroup"] == p
                                )
                              ]?.["permissions"]
                            ) !== JSON.stringify(permissionArr)
                          ) {
                            /*         console.log("prev permission array", permissionArr);
                          console.log(
                            "prev api permission array",
                            apiRes[
                              apiRes?.findIndex(
                                (apiResEle) => apiResEle["usergroup"] == p
                              )
                            ]?.["permissions"]
                          );
                          console.log(
                            "previous match check",
                            apiRes[
                              apiRes?.findIndex(
                                (apiResEle) => apiResEle["usergroup"] == p
                              )
                            ]?.["permissions"] == permissionArr
                          ); */
                            alert("PLEASEE UPDATE THE CHANGED PERMISSION");
                            setUserGroup(p);
                            return;
                          } else {
                            // setPermissionArr(e.permissions ? e.permissions : []);
                            if (
                              apiRes[
                                apiRes?.findIndex(
                                  (e) => e["usergroup"] == selected
                                )
                              ]["permissions"]
                            ) {
                              setPermissionArr(
                                apiRes[
                                  apiRes?.findIndex(
                                    (apiResEle) =>
                                      apiResEle["usergroup"] == selected
                                  )
                                ]["permissions"]
                              );
                            } else {
                              setPermissionArr([]);
                            }
                            return selected;
                          }
                        });
                        /* if (
                          apiRes[
                            apiRes?.findIndex((e) => e["usergroup"] == selected)
                          ]["permissions"]
                        ) {
                          setPermissionArr(
                            apiRes[
                              apiRes?.findIndex(
                                (apiResEle) =>
                                  apiResEle["usergroup"] == selected
                              )
                            ]["permissions"]
                          );
                        } else {
                          setPermissionArr([]);
                        } */
                        /*  } else {
                          // setMessage()
                          console.log("CLICKD");
                          console.log(e["usergroup"]);
                          console.log(
                            apiRes[
                              apiRes?.findIndex(
                                (apiResEle) =>
                                  apiResEle["usergroup"] == e["usergroup"]
                              )
                            ]["permissions"].length
                          );
                          console.log(permissionArr.length);
                          console.log(
                            apiRes[
                              apiRes?.findIndex(
                                (apiResEle) =>
                                  apiResEle["usergroup"] == e["usergroup"]
                              )
                            ]["permissions"].every((curele) => {
                              if (permissionArr.indexOf(curele) > -1) {
                                return (curele =
                                  permissionArr[permissionArr.indexOf(curele)]);
                              }
                            }),
                            "asd15as1d"
                          );
                        } */
                      }}
                    >
                      {e["usergroup"]}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {
            /* usergroup && */ <div className="permissionBox">
              <h1>Permission List</h1>
              <div className="permissionList">
                <ul>
                  {["can_add", "can_view", "can_update", "can_delete"].map(
                    (e, i) => {
                      return (
                        <li
                          key={`perm_${i}`}
                          className={
                            permissionArr.includes(e) ? "selected" : ""
                          }
                          onClick={() => {
                            if (!permissionArr.includes(e)) {
                              setPermissionArr((p) => [...p, e]);
                            } else {
                              let ogArr = [...permissionArr];
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
                  if (
                    JSON.stringify(
                      apiRes[
                        apiRes?.findIndex(
                          (apiResEle) => apiResEle["usergroup"] == usergroup
                        )
                      ]["permissions"]
                    ) !== JSON.stringify(permissionArr) &&
                    usergroup &&
                    permissionArr
                  ) {
                    AxiosInstances.post("/permissions", {
                      usergroup: usergroup,
                      permissions: permissionArr,
                    })
                      .then((res) => {
                        console.log(res);
                        setMessage({
                          message: "Permissions successfully updated!",
                          type: "successPop",
                        });
                      })
                      .catch((err) => {
                        setMessage({
                          message: "Permissions updating failed!",
                          type: "errorPop",
                        });
                        console.log(err);
                      });
                    setUserGroup("");
                    setPermissionArr([]);
                    AxiosInstances.get("/list_permissions").then((res) => {
                      console.log(res);
                      setApiRes(res.data.data);
                    });
                  }
                  // console.log(permissionArr);
                }}
              >
                Update
              </button>
            </div>
          }
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
