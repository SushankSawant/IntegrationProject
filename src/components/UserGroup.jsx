import axios from "axios";
import React, { useEffect, useState } from "react";
import AxiosInstances from "../AxiosInstances";
import { useNavigate } from "react-router-dom";

function UserGroup({ role }) {
  const [userGroupArr, setUserGroupArr] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    if (!permissions.includes("can_view")) {
      navigate("/");
    }
    /*  let usergroup = localStorage.getItem("usergroup");
    if (!role.includes(usergroup)) {
      navigate("/dashboard");
    } */
    AxiosInstances.get("/list_usergroups").then((res) => {
      console.log(res);
      setUserGroupArr(res.data.data);
    });
  }, []);

  return (
    <>
      {userGroupArr ? (
        <div className="box usergroups">
          {userGroupArr?.map((e, i) => {
            return (
              <>
                <p key={`usergroups_${i}`}>
                  {i + 1}. {e}
                  <span
                    onClick={() => {
                      setSelectedGroup(e);
                      AxiosInstances.delete(
                        "http://192.168.1.42:8000/api/v1/testapp/delete_usergroups",
                        {
                          headers: {
                            usergroup: `${e}`,
                            // "access-control-allow-origin": "*",
                            // "Content-type": "application/json; charset=UTF-8",
                          },
                        }
                      )
                        .then((res) => {
                          AxiosInstances.get("/list_usergroups").then((res) => {
                            console.log(res);
                            setUserGroupArr(res.data.data);
                          });
                        })
                        .catch((err) => console.log(err, "DELETE ERROR"));
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    ❌
                  </span>
                </p>
              </>
            );
          })}
        </div>
      ) : (
        <div className="login_page">
          <h1>NO ACCESS TO THIS PAGE</h1>
        </div>
      )}
    </>
  );
}

export default UserGroup;
