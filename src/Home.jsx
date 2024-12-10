import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import Navbar from "./Navbar";
import "./Navbar.css";
import { useAuth } from "./Context/AuthContext";
import axios from "axios";
import Pagination from "./Pagination";

function Home() {
  // const navigate = useNavigate();
  const [currPage, setCurrPage] = useState(0);
  const [userArr, setUserArr] = useState();
  let label = [
    "firstname",
    "lastname",
    "username",
    "email",
    "phone_number",
    "usergroup",
  ];
  useEffect(() => {
    axios
      .get(
        `http://192.168.1.42:8000/api/v1/testapp/list_users?page_no=${currPage}&page_size=10`,
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

    console.log(currPage);
  }, [currPage]);

  const { loginStatus } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="AAAAA">
        {/* <h1>WELCOME HOME</h1>
        <button
          onClick={() => {
            console.log(loginStatus);
          }}
        >
          checkAuth
        </button> */}
        {
          <table>
            <thead>
              <th>Sr. No.</th>
              {label.map((e, i) => {
                return <th>{e}</th>;
              })}
            </thead>
            <tbody>
              {userArr?.users?.map((userRow, i) => {
                return (
                  <tr>
                    <td>{i + currPage * 10 + 1}</td>
                    {label.map((userData, i) => {
                      return <td>{userRow[userData]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
      </div>
      <Pagination
        currPage={currPage + 1}
        setCurrPage={setCurrPage}
        arrLength={userArr?.pagination?.total_users}
      />
    </div>
  );
}

export default Home;
