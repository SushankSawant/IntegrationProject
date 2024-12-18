import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AxiosInstances from "./AxiosInstances";
import Dropdown from "./Dropdown";
// import Dropdown from "./DropDown";

function Permissions() {
  const [usergroup, setUserGroups] = useState("");
  const [userGroupArr, setUserGroupArr] = useState(null);
  const [addPermissionArr, setAddPermissionArr] = useState([]);
  const [removePermissionArr, setRemovePermissionArr] = useState([]);
  useEffect(() => {
    AxiosInstances.get("/list_usergroups").then((res) => {
      console.log(res);
      setUserGroupArr(res.data.data);
    });
  }, []);
  // console.log(addPermissionArr);
  // console.log(removePermissionArr);

  return (
    <>
      <div className="permission_wrapper">
        <h1>Permissions</h1>
        <div className="dropdownHolder">
          {/* <label htmlFor="">User Group</label> */}
          <Dropdown
            selectedData={usergroup}
            dropTitle={"User Group"}
            onchange={(e) => {
              setUserGroups(e);
            }}
            reqArr={userGroupArr}
          />
        </div>
        <div className="permissionHandler">
          <div className="permissionBox">
            <h1>Permissions</h1>

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
                {/* {Array.from({ length: 20 }).map((e, i) => {
                  return (
                    <li
                      className={
                        addPermissionArr.includes(i + 1) ? "selected" : ""
                      }
                      onClick={() => {
                        if (!addPermissionArr.includes(i + 1)) {
                          setAddPermissionArr((p) => [...p, i + 1]);
                        } else {
                          let ogArr = addPermissionArr;
                          ogArr.splice(addPermissionArr.indexOf(i + 1), 1);
                          setAddPermissionArr([...ogArr]);
                        }
                      }}
                    >
                      {i + 1}
                    </li>
                  );
                })} */}
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
          <div className="permissionBox">
            <h1>Granted Permissions</h1>
            <div className="permissionList">
              <ul>
                {["Create", "View", "Update", "Delete"].map((e, i) => {
                  return (
                    <li
                    /* className={addPermissionArr.includes(e) ? "selected" : ""}
                      onClick={() => {
                        if (!addPermissionArr.includes(e)) {
                          setAddPermissionArr((p) => [...p, e]);
                        } else {
                          let ogArr = addPermissionArr;
                          ogArr.splice(addPermissionArr.indexOf(e), 1);
                          setAddPermissionArr([...ogArr]);
                        }
                      }} */
                    >
                      {e}
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <button>Remove</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Permissions;
