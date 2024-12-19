import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AxiosInstances from "../AxiosInstances";
import Dropdown from "./Dropdown";
// import Dropdown from "./DropDown";

function Permissions() {
  const [usergroup, setUserGroups] = useState("");
  const [userGroupArr, setUserGroupArr] = useState(null);
  const [addPermissionArr, setAddPermissionArr] = useState([]);
  const [removePermissionArr, setRemovePermissionArr] = useState([]);
  useEffect(() => {
    // setUserGroups(localStorage.getItem)
    AxiosInstances.get("/list_usergroups").then((res) => {
      console.log(res);
      setUserGroupArr(res.data.data);
    });
  }, []);
  // console.log(addPermissionArr);
  // console.log(removePermissionArr);
  console.log(usergroup);

  return (
    <>
      <div className="permission_wrapper">
        <h1>Permissions</h1>
        {/* <div className="dropdownHolder">
          <Dropdown
            selectedData={usergroup}
            dropTitle={"User Group"}
            onchange={(e) => {
              setUserGroups(e);
            }}
            reqArr={userGroupArr}
          />
        </div> */}
        <div className="permissionHandler">
          <div className="permissionBox">
            <h1>Usergroups</h1>

            <div className="permissionList">
              <ul>
                {userGroupArr?.map((e, i) => {
                  return (
                    <li
                      className={usergroup == e ? "selected" : ""}
                      onClick={() => {
                        setUserGroups(e);
                        /*  if (!addPermissionArr.includes(e)) {
                          setUserGroups(e);
                        } else {
                         setUserGroups
                        } */
                      }}
                    >
                      {e}
                    </li>
                  );
                })}
              </ul>
            </div>
            {/*   <button
              onClick={() => {
                console.log(addPermissionArr);
              }}
            >
              Update
            </button> */}
          </div>
          <div className="permissionBox">
            <h1>Permission List</h1>

            <div className="permissionList">
              <ul>
                {["Create", "View", "Update", "Delete"].map((e, i) => {
                  return (
                    <li
                      className={addPermissionArr.includes(e) ? "selected" : ""}
                      onClick={() => {
                        if (!addPermissionArr.includes(e)) {
                          setAddPermissionArr((p) => [...p, e]);
                        } else {
                          let ogArr = addPermissionArr;
                          ogArr.splice(addPermissionArr.indexOf(e), 1);
                          setAddPermissionArr([...ogArr]);
                        }
                      }}
                    >
                      {e}
                    </li>
                  );
                })}
              </ul>
            </div>
            <button
              onClick={() => {
                console.log(addPermissionArr);
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
