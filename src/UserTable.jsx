import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Dropdown from "./DropDown";
import { useAuth } from "./Context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import AxiosInstances from "./AxiosInstances";

function UserTable({ role }) {
  let usergroup = localStorage.getItem("usergroup");
  const [searchParam, setSearchParam] = useSearchParams();
  console.log(searchParam.get("pageno"));
  const [currPage, setCurrPage] = useState(searchParam.get("pageno") || 1);

  console.log(currPage);
  const [searchInput, setSearchInput] = useState({
    word: "",
    number: searchParam.get("dataLength") || "10",
  });

  const [userArr, setUserArr] = useState();
  let label = [
    "firstname",
    "lastname",
    "username",
    "email",
    "phone_number",
    "usergroup",
    "datetime",
  ];
  const navigate = useNavigate();
  useEffect(() => {
    let usergroup = localStorage.getItem("usergroup");
    if (!role.includes(usergroup)) {
      navigate("/");
    }
    callUserListApi();
    // if (currPage != 1) {
    setSearchParam((params) => {
      params.set("pageno", currPage);
      params.set("dataLength", searchInput.number);
      return params;
    });
    // }
  }, [currPage, searchInput.number]);

  // const { isTokenExpired } = useAuth();
  async function callUserListApi() {
    AxiosInstances.get(
      `/${
        usergroup == "superadmin" ? "list_users" : "list_members"
      }?page_no=${currPage}&page_size=${
        searchInput.number === "" ? 10 : searchInput.number
      }&username=${searchInput.word}`
    )
      .then((res) => {
        if (res?.status === 200) {
          setUserArr(res.data);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }

  /* function handleSelected(e) {
    const { name, checked, value } = e.target;
    console.log(name, checked, value);
    let userExists = selectedUserArr.includes(name);

    if (!userExists) {
      setSelectedUserArr((prev) => [...prev, name]);
    } else {
      let filteredArray = selectedUserArr;
      filteredArray.splice(filteredArray.indexOf(name), 1);
      setSelectedUserArr([...filteredArray]);
    }
  } */
  // console.log(selectedUserArr);

  return (
    <div>
      <div className="search_userList">
        <input
          type="text"
          placeholder="Search by username/email"
          onChange={(e) => {
            setSearchInput((p) => ({
              ...p,
              word: e.target.value,
            }));
          }}
        />

        <button onClick={callUserListApi}>🔎</button>
        <Dropdown
          selectedData={searchInput?.number}
          dropTitle={"data limit"}
          onchange={(e) => {
            // callUserListApi();
            setSearchInput((p) => ({
              ...p,
              number: e,
            }));
            setCurrPage(1);
          }}
          reqArr={["10", "20", "30"]}
        />
        {
          <button
            onClick={() => {
              axios
                .post(
                  "http://192.168.1.42:8000/api/v1/testapp/users_delete",
                  {},
                  { headers: { username: selectedUserArr } }
                )
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            }}
          >
            Delete
          </button>
        }
      </div>
      {
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              {label.map((e, i) => {
                return <th key={`tablehead_${i}`}>{e}</th>;
              })}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userArr?.[usergroup == "superadmin" ? "users" : "members"].map(
              (userRow, i) => {
                return (
                  <tr key={`tablerow_${i}`}>
                    <td key={`tabledetail_srno_${i}`}>
                      {
                        <input
                          type="checkbox"
                          // name={userRow["username"]}
                          // key={userRow["username"]}
                          // checked={selectedUserArr.includes(userRow["username"])}
                          // onChange={handleSelected}
                        />
                      }
                      {i + (currPage - 1) * searchInput.number + 1}
                    </td>
                    {label.map((userData, i) => {
                      return (
                        <td key={`tabledetail_${i}`}>{userRow[userData]}</td>
                      );
                    })}
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        // let selectedData = { username: `${userRow["username"]}` };
                        // setSelectedUserArr(userRow["username"]);
                        console.log(userRow["username"]);
                        // let curClicked = { username: `${userRow["username"]}` };
                        AxiosInstances.delete(
                          "http://192.168.1.42:8000/api/v1/testapp/users_delete",
                          {
                            headers: {
                              username: `${userRow["username"]}`,
                              // "access-control-allow-origin": "*",
                              // "Content-type": "application/json; charset=UTF-8",
                            },
                          }
                        )
                          .then((res) => {
                            callUserListApi();
                            console.log(res);
                          })
                          .catch((err) => console.log(err, "DELETE ERROR"));
                      }}
                    >
                      🗑️
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      }
      {
        /* userArr?.users?.length > 1 && */
        <Pagination
          currPage={/* currPage */ Number(currPage)}
          setCurrPage={setCurrPage}
          arrLength={
            userArr?.[
              usergroup == "superadmin" ? "total_users" : "total_members"
            ]
          }
          dataLimit={searchInput?.number}
          setSearchParam={setSearchParam}
        />
      }
    </div>
  );
}

export default UserTable;
