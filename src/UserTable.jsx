import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Dropdown from "./DropDown";
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AxiosInstances from "./AxiosInstances";

function UserTable() {
  const [currPage, setCurrPage] = useState(1);
  const [searchInput, setSearchInput] = useState({
    word: "",
    number: "10",
  });
  // const [selectedUserArr, setSelectedUserArr] = useState({ username: "" });
  // const [selectedUserArr, setSelectedUserArr] = useState("");

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
  useEffect(() => {
    callUserListApi();
    // console.log(currPage);
  }, [currPage, searchInput.number /* selectedUserArr */]);

  const navigate = useNavigate();

  const { isTokenExpired } = useAuth();
  async function callUserListApi() {
    /*  if (
      isTokenExpired(JSON.parse(localStorage.getItem("token")).refresh_token)
    ) {
      console.log(
        isTokenExpired(JSON.parse(localStorage.getItem("token")).refresh_token)
      );
      localStorage.removeItem("token");
      navigate("/login");
    } else { */
    AxiosInstances.get(
      `/api/v1/testapp/list_users?page_no=${currPage}&page_size=${searchInput.number}&username=${searchInput.word}`
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
            callUserListApi();
            setSearchInput((p) => ({
              ...p,
              number: e,
            }));
          }}
          reqArr={["10", "20", "30"]}
        />
        {/*  <button
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
        </button> */}
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
            {userArr?.users?.map((userRow, i) => {
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
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err, "DELETE ERROR"));

                      callUserListApi();
                    }}
                  >
                    🗑️
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
      {
        /* userArr?.users?.length > 1 && */ <Pagination
          currPage={currPage}
          setCurrPage={setCurrPage}
          arrLength={userArr?.total_users}
          dataLimit={searchInput?.number}
        />
      }
    </div>
  );
}

export default UserTable;
