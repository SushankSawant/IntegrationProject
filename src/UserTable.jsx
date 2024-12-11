import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Dropdown from "./DropDown";
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserTable() {
  const [currPage, setCurrPage] = useState(1);
  const [searchInput, setSearchInput] = useState({
    word: "",
    number: "10",
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
  useEffect(() => {
    callUserListApi();
    console.log(currPage);
  }, [currPage, searchInput.number]);

  const navigate = useNavigate();

  const { isTokenExpired } = useAuth();
  function callUserListApi() {
    if (
      isTokenExpired(JSON.parse(localStorage.getItem("token")).refresh_token)
    ) {
      console.log(
        isTokenExpired(JSON.parse(localStorage.getItem("token")).refresh_token)
      );
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      axios
        .get(
          `http://192.168.1.42:8000/api/v1/testapp/list_members?page_no=${currPage}&page_size=${searchInput.number}&username=${searchInput.word}`,
          {
            headers: {
              "access-control-allow-origin": "*",
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        .then((res) => {
          setUserArr(res.data);
          console.log(res.data);
        });
    }
  }

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
      </div>
      {
        <table>
          <thead>
            <th>Sr. No.</th>
            {label.map((e, i) => {
              return <th key={`tablehead_${i}`}>{e}</th>;
            })}
          </thead>
          <tbody>
            {userArr?.members?.map((userRow, i) => {
              return (
                <tr key={`tablerow_${i}`}>
                  <td key={`tabledetail_srno_${i}`}>
                    {i + (currPage - 1) * searchInput.number + 1}
                  </td>
                  {label.map((userData, i) => {
                    return (
                      <td key={`tabledetail_${i}`}>{userRow[userData]}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      }
      {userArr?.members.length > 1 && (
        <Pagination
          currPage={currPage}
          setCurrPage={setCurrPage}
          arrLength={userArr?.total_members}
          dataLimit={searchInput?.number}
        />
      )}
    </div>
  );
}

export default UserTable;
