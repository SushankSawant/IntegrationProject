import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import Navbar from "./Navbar";
import "../styling/Navbar.css";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import Pagination from "./Pagination";
import addUserGroup from "./AddUserGroup";
import UserTable from "./UserTable";
import UserGroup from "./UserGroup";
import { useThemeContext } from "../Context/ThemeContext";
// import { use } from "react";

function Home() {
  // const navigate = useNavigate();
  let usergroup = localStorage.getItem("usergroup");
  const { setTheme } = useThemeContext();
  // console.log(useLocation());

  // const [toShow, setToShow] = useState("");
  /*  const toShowObj = {
    userTable: <UserTable />,
    userGroup: <UserGroup />,
  }; */
  // const [user, setUser] = useState(null);

  useEffect(() => {
    // setUser(localStorage.getItem("username"));
    let theme = localStorage.getItem("theme");
    setTheme(theme);
  }, []);
  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  );
}

export default Home;
