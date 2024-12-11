import axios from "axios";
import React, { useEffect, useState } from "react";

function UserGroup() {
  const [userGroupArr, setUserGroupArr] = useState(null);

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
          <p key={`usergroups_${i}`}>
            {i + 1}. {e}
          </p>
        );
      })}
    </div>
  );
}

export default UserGroup;
