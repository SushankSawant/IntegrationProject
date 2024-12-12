import axios from "axios";
import React, { useEffect, useState } from "react";

function UserGroup() {
  const [userGroupArr, setUserGroupArr] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState();

  useEffect(() => {
    axios
      .get("http://192.168.1.42:8000/api/v1/testapp/list_usergroups", {
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        console.log(res);
        setUserGroupArr(res.data.data);
      });
  }, []);

  return (
    <div className="box usergroups">
      {userGroupArr?.map((e, i) => {
        return (
          <>
            <p key={`usergroups_${i}`}>
              {i + 1}. {e}
              <span
                onClick={() => {
                  setSelectedGroup(e);
                  axios
                    .delete(
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
                      axios
                        .get(
                          "http://192.168.1.42:8000/api/v1/testapp/list_usergroups",
                          {
                            headers: {
                              "access-control-allow-origin": "*",
                              "Content-type": "application/json; charset=UTF-8",
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res);
                          setUserGroupArr(res.data.data);
                        });
                    })
                    .catch((err) => console.log(err, "DELETE ERROR"));
                }}
                style={{ cursor: "pointer" }}
              >
                🗑️
              </span>
            </p>
          </>
        );
      })}
    </div>
  );
}

export default UserGroup;
